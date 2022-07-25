import { BrowserWindow, ipcMain } from 'electron';

export const registerListeners = (mainWindow: BrowserWindow) => {
  ipcMain.handle('toggle-devtools', (_event: any) => {
    if (mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.webContents.closeDevTools();
    } else {
      mainWindow.webContents.openDevTools();
    }
  });
};

export default { registerListeners };
