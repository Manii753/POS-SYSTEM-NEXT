import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import './ipcHandlers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔵 Create main window
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

  win.loadURL('http://localhost:3000');
}

// ✅ Create and print receipt window
function openReceiptWindow(sale) {
  const receiptWin = new BrowserWindow({
    width: 340,
    height: 600,
    show: false,
    webPreferences: {
      contextIsolation: true,
    },
  });

  const receiptPath = path.join(__dirname, 'receipt.html');
  const dataParam = encodeURIComponent(JSON.stringify(sale));
  receiptWin.loadURL(`file://${receiptPath}?data=${dataParam}`);

  receiptWin.once('ready-to-show', () => {
    receiptWin.show();
  });
}



// 🔵 App lifecycle
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

export { openReceiptWindow } 