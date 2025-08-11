// main/ipcHandlers.js
import { ipcMain } from 'electron';
import { openReceiptWindow } from './main.js';
import { addProduct, getProducts  ,deleteProduct, updateProduct} from './productService.js';
import {
  addSale,
  getAllSales,
  getSalesByDay,
  getSalesByMonth,
  getTotalSalesAmount
} from './salesService.js';
import { dialog } from 'electron';
import PDFDocument from 'pdfkit';
import fs from 'fs';




//Handle product-related IPC calls 

// ✅ Handle adding product
ipcMain.handle('add-product', async (event, product) => {
  try {
    const id = addProduct(product);
    return { success: true, id };
  } catch (err) {
    if (err.code === 'BARCODE_EXISTS') {
      return { success: false, error: err.message };
    }
    console.error('Error adding product:', err);
    return { success: false, error: 'Unexpected error' };
  }
});


// ✅ Handle fetching all products
ipcMain.handle('get-products', () => {
  try {
    return getProducts();
  } catch (err) {
    console.error('Failed to fetch products:', err);
    throw err;
  }
});

// ✅ Deleting a product
ipcMain.handle('delete-product', (event, id) => {
  return deleteProduct(id);
});

// ✅ Updating a product
ipcMain.handle('update-product', (event, product) => {
  return updateProduct(product);
});










//Handle sales-related IPC calls

ipcMain.handle('addSale', (_, sale) => addSale(sale));
ipcMain.handle('getAllSales', () => getAllSales());
ipcMain.handle('getSalesByDay', (_, date) => getSalesByDay(date));
ipcMain.handle('getSalesByMonth', (_, month) => getSalesByMonth(month));
ipcMain.handle('getTotalSalesAmount', () => getTotalSalesAmount());

// Export the ipcMain handlers for use in the main process
ipcMain.handle('printReceipt', (_, sale) => {
  openReceiptWindow(sale);
});


// Handle downloading receipt as PDF


ipcMain.handle('download-receipt-pdf', async (event, saleInfo) => {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Save Receipt as PDF',
      defaultPath: `receipt_${saleInfo.documentCode}.pdf`,
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
    });

    if (canceled) return { success: false, error: 'User cancelled' };

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(filePath));

    // Store header
    doc.fontSize(18).text('My Store', { align: 'center' });
    doc.fontSize(10).text('123 Market Street, Karachi', { align: 'center' });
    doc.text('Phone: 0300-1234567', { align: 'center' });
    doc.moveDown();

    // Receipt title
    doc.fontSize(14).text('Receipt', { align: 'center' });
    doc.text(`Code: ${saleInfo.documentCode}`, { align: 'center' });
    doc.moveDown();

    // Table header
    doc.fontSize(12).text('Item', 50, doc.y, { continued: true })
      .text('Qty', 250, doc.y, { continued: true })
      .text('Price', 300, doc.y, { continued: true })
      .text('Total', 370, doc.y);
    doc.moveTo(50, doc.y).lineTo(500, doc.y).stroke();

    // Items
    saleInfo.items.forEach(item => {
      const total = (item.quantity * item.price).toFixed(2);
      doc.fontSize(10)
        .text(item.name, 50, doc.y, { continued: true })
        .text(item.quantity, 250, doc.y, { continued: true })
        .text(`Rs ${item.price.toFixed(2)}`, 300, doc.y, { continued: true })
        .text(`Rs ${total}`, 370, doc.y);
    });

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(500, doc.y).stroke();

    // Totals
    doc.fontSize(12).text(`Total: Rs ${saleInfo.totalAmount.toFixed(2)}`, { align: 'right' });
    doc.text(`Paid: Rs ${(saleInfo.totalAmount + saleInfo.change).toFixed(2)}`, { align: 'right' });
    doc.text(`Change: Rs ${saleInfo.change.toFixed(2)}`, { align: 'right' });

    doc.moveDown();
    doc.fontSize(10).text('Thank you for shopping with us!', { align: 'center' });

    doc.end();

    return { success: true, filePath };
  } catch (err) {
    console.error('Error generating PDF:', err);
    return { success: false, error: err.message };
  }
});
