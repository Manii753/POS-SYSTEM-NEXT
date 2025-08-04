import db from './db.js'; // your SQLite connection

export function addSale({ totalAmount, items }) {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0];
  const documentCode = `INV-${date.replace(/-/g, '')}-${Date.now().toString().slice(-4)}`;

  const insertSale = db.prepare(`
    INSERT INTO sales (document_code, date, time, total_amount, items)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = insertSale.run(
    documentCode,
    date,
    time,
    totalAmount,
    JSON.stringify(items) // save array of products
  );

  return {
    id: result.lastInsertRowid,
    documentCode,
    date,
    time,
    totalAmount
  };
}

export function getAllSales() {
  return db.prepare(`SELECT * FROM sales ORDER BY date DESC, time DESC`).all();
}

export function getSalesByMonth(month) {
  return db
    .prepare(`SELECT * FROM sales WHERE strftime('%m', date) = ?`)
    .all(String(month).padStart(2, '0'));
}

export function getSalesByDay(date) {
  return db.prepare(`SELECT * FROM sales WHERE date = ?`).all(date);
}

export function getTotalSalesAmount() {
  const row = db.prepare(`SELECT SUM(total_amount) as total FROM sales`).get();
  return row.total || 0;
}
