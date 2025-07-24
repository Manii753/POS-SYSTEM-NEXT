// main/preload.js (✅ CommonJS version)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addProduct: (product) => ipcRenderer.invoke('add-product', product),
  getProducts: () => ipcRenderer.invoke('get-products'),
});
