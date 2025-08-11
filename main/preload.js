// main/preload.js (✅ CommonJS version)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addProduct: (product) => ipcRenderer.invoke('add-product', product),
  getProducts: () => ipcRenderer.invoke('get-products'),
  deleteProduct: (id) => ipcRenderer.invoke('delete-product', id),
  updateProduct: (product) => ipcRenderer.invoke('update-product', product),
  addSale: (sale) => ipcRenderer.invoke('addSale', sale),
  getAllSales: () => ipcRenderer.invoke('getAllSales'),
  getSalesByDay: (date) => ipcRenderer.invoke('getSalesByDay', date),
  getSalesByMonth: (month) => ipcRenderer.invoke('getSalesByMonth', month),
  getTotalSalesAmount: () => ipcRenderer.invoke('getTotalSalesAmount'),
  printReceipt: (sale) => ipcRenderer.invoke('printReceipt', sale),
  downloadReceiptPDF: (saleData) => ipcRenderer.invoke('download-receipt-pdf', saleData),
  auth: {
    signup: (data) => ipcRenderer.invoke('auth-signup', data),
    login: (data) => ipcRenderer.invoke('auth-login', data),
    verify: (token) => ipcRenderer.invoke('auth-verify', token),
  },

  

  
});
