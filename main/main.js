// main/main.js
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { addProduct } from './productService.js'; 

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

  // Load your Next.js app
  win.loadURL('http://localhost:3000');
}

// Register IPC handler for adding product
ipcMain.handle('add-product', async (event, product) => {
  try {
    const result = addProduct(product);
    return result;
  } catch (err) {
    console.error('Failed to add product:', err);
    throw err;
  }
});

app.whenReady().then(createWindow);

// Quit app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
