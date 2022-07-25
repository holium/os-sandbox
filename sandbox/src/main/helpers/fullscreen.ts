import { BrowserWindow } from 'electron';

export const registerListeners = (mainWindow: BrowserWindow) => {
  mainWindow.on('enter-full-screen', (e: any) => {
    mainWindow.webContents.send('set-fullscreen', true);
    // Kiosk mode will prevent any native OS edge events or the ability
    // to easily exit. We want to put a button in the Realm experience to
    // enable and disable what we will call "isolation mode".
    //
    // mainWindow.setKiosk(true);
  });

  mainWindow.on('leave-full-screen', (e: any) => {
    mainWindow.webContents.send('set-fullscreen', false);
    // mainWindow.setKiosk(false);
  });
};

export default { registerListeners };
