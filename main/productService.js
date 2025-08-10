
// main/productService.js
import db from './db.js';

// ✅ Add new product
export function addProduct(product) {
  const { name, sku, price, stock, barcodes } = product;

  const existingBarcode = barcodes?.find((code) => {
    const row = db.prepare('SELECT 1 FROM barcodes WHERE code = ?').get(code);
    return !!row;
  });

  if (existingBarcode) {
    // Throw a custom error that frontend can catch
    const error = new Error(`Barcode already exists: ${existingBarcode}`);
    error.code = 'BARCODE_EXISTS';
    throw error;
  }

  const insertProduct = db.prepare(`
    INSERT INTO products (name, sku, price, stock)
    VALUES (?, ?, ?, ?)
  `);

  const result = insertProduct.run(name, sku, price, stock);
  const productId = result.lastInsertRowid;

  const insertBarcode = db.prepare(`
    INSERT INTO barcodes (product_id, code)
    VALUES (?, ?)
  `);

  const insertMany = db.transaction((codes) => {
    for (const code of codes) {
      if (code && typeof code === 'string' && code.trim() !== '') {
        insertBarcode.run(productId, code.trim());
      }
    }
  });

  if (Array.isArray(barcodes) && barcodes.length > 0) {
    insertMany(barcodes);
  }

  return productId;
}


// ✅ Get all products
export function getProducts() {
  const rows = db.prepare(`
    SELECT 
      p.*, 
      GROUP_CONCAT(b.code, ',') AS barcodes
    FROM products p
    LEFT JOIN barcodes b ON b.product_id = p.id
    GROUP BY p.id
  `).all();

  return rows.map(p => ({
    ...p,
    barcodes: p.barcodes ? p.barcodes.split(',').filter(Boolean) : [],
  }));
}


export function deleteProduct(id) {
  return db.prepare(`DELETE FROM products WHERE id = ?`).run(id);
}

export function updateProduct({ id, name, sku, barcodes, price, stock }) {
  
  const update = db.prepare(`
    UPDATE products SET name = ?, sku = ?, price = ?, stock = ?
    WHERE id = ?
  `);

  const deleteBarcodes = db.prepare(`DELETE FROM barcodes WHERE product_id = ?`);

  const insertBarcode = db.prepare(`
    INSERT INTO barcodes (product_id, code) VALUES (?, ?)
  `);

  const transaction = db.transaction(() => {
    update.run(name, sku, price, stock, id);
    deleteBarcodes.run(id);

    if (Array.isArray(barcodes)) {
      for (const code of barcodes) {
        insertBarcode.run(id, code);
      }
    }
  });

  transaction();
}
