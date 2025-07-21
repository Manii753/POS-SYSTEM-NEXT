// main/productService.js
import db from './db.js';

export function addProduct(product) {
  const stmt = db.prepare(`
    INSERT INTO products (name, barcode, price, stock)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(product.name, product.barcode, product.price, product.stock);
}
