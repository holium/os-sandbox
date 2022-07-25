import { contextBridge, ipcRenderer, webFrame } from 'electron';

const appPreload = {
  setFullscreen(callback: any) {
    ipcRenderer.on('set-fullscreen', callback);
  },
  setAppviewPreload(callback: any) {
    ipcRenderer.on('set-appview-preload', callback);
  },
  openApp: (app: any, partition: string) => {
    return ipcRenderer.invoke('open-app', app, partition);
  },
  setPartitionCookies: (partition: any, cookies: any) => {
    return ipcRenderer.invoke('set-partition-cookies', partition, cookies);
  },
  closeApp: (app: any) => {
    return ipcRenderer.invoke('close-app', app);
  },
  askForMicrophone: () => {
    return ipcRenderer.invoke('ask-for-microphone');
  },
  toggleDevTools: () => {
    return ipcRenderer.invoke('toggle-devtools');
  },
};
export type AppPreloadType = typeof appPreload;

contextBridge.exposeInMainWorld('electron', {
  app: appPreload,
});
