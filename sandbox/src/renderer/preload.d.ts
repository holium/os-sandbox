import { AppPreloadType } from 'main/preload';

declare global {
  interface Window {
    electron: {
      app: AppPreloadType;
    };
  }
}

export {};
