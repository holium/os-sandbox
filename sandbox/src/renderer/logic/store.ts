import { createContext, useContext } from 'react';
import {
  Instance,
  types,
  applySnapshot,
  castToSnapshot,
} from 'mobx-state-tree';
import { DimensionModelType } from 'renderer/logic/types';
import { getInitialWindowDimensions } from './lib/window-manager';
import { devApp } from 'renderer/development';

// -------------------------------
// Create core context
// -------------------------------

export const DevStore = types
  .model({
    preloadPath: types.maybe(types.string),
    baseThemeMode: types.enumeration(['light', 'dark']),
    theme: types.model('ThemeModel', {
      backgroundColor: types.optional(types.string, '#c4c3bf'),
      accentColor: types.optional(types.string, '#4E9EFD'),
      inputColor: types.optional(types.string, '#FFFFFF'),
      dockColor: types.optional(types.string, '#F5F5F4'),
      windowColor: types.optional(types.string, '#f5f5f4'),
      mode: types.optional(types.enumeration(['light', 'dark']), 'light'),
      textColor: types.optional(types.string, '#2a2927'),
      iconColor: types.optional(types.string, '#333333'),
    }),
    isFullscreen: types.optional(types.boolean, false),
    desktopDimensions: types.optional(
      types.model({
        width: types.number,
        height: types.number,
      }),
      { width: 0, height: 0 }
    ),
    activeWindow: types.model('WindowModel', {
      id: types.identifier,
      isOpen: types.boolean,
      glob: types.optional(types.boolean, false),
      title: types.optional(types.string, ''),
      zIndex: types.number,
      type: types.optional(types.enumeration(['dev']), 'dev'),
      dimensions: types.model({
        x: types.number,
        y: types.number,
        width: types.number,
        height: types.number,
      }),
    }),
  })
  .actions((self) => ({
    setAppPreload(path: string) {
      self.preloadPath = path;
    },
    setDesktopDimensions(width: number, height: number) {
      self.desktopDimensions = {
        width,
        height,
      };
    },
    openApp: () => {
      self.activeWindow.isOpen = true;
      self.activeWindow.dimensions = getInitialWindowDimensions(
        self.activeWindow,
        self.desktopDimensions,
        self.isFullscreen
      );
    },
    closeApp: () => {
      self.activeWindow.isOpen = false;
    },
    setThemeMode: (mode: 'light' | 'dark') => {
      self.baseThemeMode = mode;
      if (mode === 'dark') {
        self.theme = castToSnapshot({
          backgroundColor: '#212E37',
          dockColor: '#2A3843',
          windowColor: '#2A3843',
          mode: 'dark',
          textColor: '#FFFFFF',
          iconColor: '#FFFFFF50',
        });
      } else {
        self.theme = castToSnapshot({
          backgroundColor: '#B4BDC2',
          dockColor: '#ECEFF0',
          windowColor: '#ECEFF0',
          mode: 'light',
          textColor: '#261f1f',
          iconColor: '#333333',
        });
      }
    },
    setAppDimensions(windowId: string, dimensions: DimensionModelType) {
      const newDim = {
        x: Math.round(dimensions.x * 1000) / 1000,
        y: Math.round(dimensions.y * 1000) / 1000,
        width: dimensions.width,
        height: dimensions.height,
      };
      applySnapshot(self.activeWindow.dimensions, newDim);
    },
  }));

export const devStore = DevStore.create({
  preloadPath: '',
  baseThemeMode: 'light',
  theme: {
    backgroundColor: '#B4BDC2', //#2A3843
    dockColor: '#ECEFF0', // #212D36
    windowColor: '#ECEFF0', // #212D36
    mode: 'light', // dark
    textColor: '#261f1f', // #FFFFFF
    iconColor: '#333333', // #FFFFFF50
  },
  isFullscreen: false,
  activeWindow: {
    id: devApp.id,
    glob: false,
    title: devApp.title,
    zIndex: 2,
    type: 'dev',
    isOpen: false,
    dimensions: {
      x: 12,
      y: 12,
      width: devApp.initial.width,
      height: devApp.initial.height,
    },
  },
});

// -------------------------------
// Create dev context
// -------------------------------
export type DevInstance = Instance<typeof DevStore>;
const DevStateContext = createContext<null | DevInstance>(devStore);

export const DevProvider = DevStateContext.Provider;
export function useDev() {
  const store = useContext(DevStateContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

// Get preload path from main process
window.electron.app.setAppviewPreload((_event: any, data: any) => {
  devStore.setAppPreload(data);
});
