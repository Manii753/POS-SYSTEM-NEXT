🧾 Electron POS System (with Next.js + SQLite + Receipt Printing)
This is a modern, offline-first Point of Sale (POS) system built with:

Next.js (frontend UI)

Electron (cross-platform desktop wrapper)

better-sqlite3 (blazing fast embedded SQLite)

Tailwind CSS for styling

The app is designed to run fully locally with zero internet dependency — ideal for small stores, grocery shops, and kiosks.

✨ Features
✅ Product Management
Add/edit/delete products

Supports multiple barcodes per product

Barcodes can be typed or scanned via scanner

✅ POS Cart & Checkout
Add products to cart by scanning barcode or searching

Increase/decrease quantity

Checkout screen with:

Cash input via numeric keypad

Total + change calculation

✅ Sales Recording
Every sale is saved with:

Items, price, quantity

Unique document code

Date & time stamp

✅ Receipt Printing
Clean thermal-printer-friendly layout

Auto print receipt on successful payment

Optimized for 80mm thermal paper

📊 Dashboard (Sales Analytics)
Total Sales

Today's Sales

Monthly Sales Graph

Select any month to view sales breakdown

📦 Tech Stack
Layer	Tech
UI	Next.js + Tailwind CSS
Desktop App	Electron
DB	SQLite (better-sqlite3)
State Mgmt	React Hooks
IPC	Electron Preload (contextBridge)

🚀 Getting Started
bash
Copy
Edit
# Clone this repo
git clone https://github.com/yourusername/pos-system
cd pos-system

# Install dependencies
npm install

# Start dev environment
npm run dev
Then in another terminal:

bash
Copy
Edit
# Start Electron
npm run electron
🖨 Thermal Printer Setup
Make sure your printer is set to 72mm or 80mm width.

Disable page headers/footers from the browser printer settings.

Receipts auto-print and close when a sale is completed.

📅 Coming Soon
Stock updates on sales

Customer management

Refund support

Multi-register sync (with optional cloud sync)



🧑‍💻 Author
Built by [Abdul Rehman (Manii753)] – feel free to open issues or contribute.
