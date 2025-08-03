
// main/productService.js
import db from './db.js';

// ✅ Add new product
export function addProduct(product) {
  const stmt = db.prepare(`
    INSERT INTO products (name, sku, barcode, price, stock)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(product.name, product.sku, product.barcode, product.price, product.stock);
}

// ✅ Get all products
export function getProducts() {
  const stmt = db.prepare(`SELECT * FROM products`);
  return stmt.all();
}

export function deleteProduct(id) {
  return db.prepare(`DELETE FROM products WHERE id = ?`).run(id);
}

export function updateProduct({ id, name, sku, barcode, price, stock }) {
  return db.prepare(`
    UPDATE products SET name = ?,sku = ?, barcode = ?, price = ?, stock = ?
    WHERE id = ?
  `).run(name, sku, barcode, price, stock, id);
  
}