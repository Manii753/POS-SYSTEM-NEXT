// main/ipcHandlers.js
import { ipcMain } from 'electron';

import { addProduct, getProducts  ,deleteProduct, updateProduct} from './productService.js';
import {
  addSale,
  getAllSales,
  getSalesByDay,
  getSalesByMonth,
  getTotalSalesAmount
} from './salesService.js';


//Handle product-related IPC calls 

// ✅ Handle adding product
ipcMain.handle('add-product', async (event, product) => {
  try {
    addProduct(product);
    return { success: true };
  } catch (err) {
    console.error('Failed to add product:', err);
    throw err;
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