import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { addProduct, getProducts } from './productService.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:3000'); // or your packed HTML in production
}

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

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
