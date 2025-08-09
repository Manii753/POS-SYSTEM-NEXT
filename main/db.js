import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';

const dbPath = path.join(app.getPath('userData'), 'pos.db');


// Ensure the folder exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
console.log('Database initialized:', db);


// ✅ Create products table

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
  );
`);

// ✅ Create separate barcodes table
db.exec(`
  CREATE TABLE IF NOT EXISTS barcodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    code TEXT NOT NULL UNIQUE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_code TEXT UNIQUE,
    date TEXT,
    time TEXT,
    total_amount REAL,
    items TEXT
  );
`);



export default db;
