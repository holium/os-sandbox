import { BrowserWindow } from 'electron';

export const registerListeners = (mainWindow: BrowserWindow) => {
  mainWindow.on('enter-full-screen', (e: any) => {
    mainWindow.webContents.send('set-fullscreen', true);
  });

  mainWindow.on('leave-full-screen', (e: any) => {
    mainWindow.webContents.send('set-fullscreen', false);
  });
};

export default { registerListeners };
