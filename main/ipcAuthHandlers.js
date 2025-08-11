// main/ipcAuthHandlers.js
import { ipcMain } from 'electron';
import authService from './authService.js';

ipcMain.handle('auth-signup', async (event, payload) => {
  try {
    const r = await authService.signup(payload);
    return { success: true, ...r };
  } catch (err) {
    if (err.code === 'USER_EXISTS') return { success: false, error: 'USER_EXISTS', message: err.message };
    console.error('auth-signup error', err);
    return { success: false, error: 'UNKNOWN', message: err.message || String(err) };
  }
});

ipcMain.handle('auth-login', async (event, payload) => {
  try {
    const r = await authService.login(payload);
    return { success: true, ...r };
  } catch (err) {
    if (err.code === 'INVALID_CREDENTIALS') return { success: false, error: 'INVALID_CREDENTIALS', message: 'Invalid email or password' };
    console.error('auth-login error', err);
    return { success: false, error: 'UNKNOWN', message: err.message || String(err) };
  }
});

ipcMain.handle('auth-verify', async (event, token) => {
  try {
    const payload = authService.verifyToken(token);
    return { success: true, payload };
  } catch (err) {
    return { success: false, error: 'INVALID_TOKEN' };
  }
});
