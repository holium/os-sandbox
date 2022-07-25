import { BrowserWindow, ipcMain, systemPreferences } from 'electron';

export const registerListeners = (mainWindow: BrowserWindow) => {
  ipcMain.handle('ask-for-microphone', async (_event) => {
    console.log(
      'microphone access:',
      systemPreferences.getMediaAccessStatus('microphone')
    );

    const result = await systemPreferences.askForMediaAccess('microphone');
    //  if (result.state == 'granted') {
    //  } else if (result.state == 'prompt') {
    //  } else if (result.state == 'denied') {
    //  }
    return systemPreferences.getMediaAccessStatus('microphone');
  });
};

export default { registerListeners };
