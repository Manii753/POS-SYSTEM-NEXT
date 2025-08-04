import { Menu, app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import './ipcHandlers.js';



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




app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
