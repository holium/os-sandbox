import { ThemeModelType } from 'renderer/logic/types';

export type DevAppType = {
  id: string;
  title: string;
  type: 'dev';
  color: string;
  icon?: string;
  native?: {
    hideTitlebarBorder?: boolean;
    noTitlebar?: boolean;
    openFullscreen?: boolean;
  };
  web?: {
    url: string;
    openFullscreen?: boolean;
    theme?: ThemeModelType;
    development?: boolean;
    hideTitlebarBorder?: boolean;
    noTitlebar?: boolean;
  };
  initial: {
    width: number;
    height: number;
  };
};

const appUrl: string = process.env.APP_URL!;
const appId: string = process.env.APP_ID!;
const appName: string = process.env.APP_NAME!;
const appColor: string = process.env.APP_COLOR!;
const appIcon: string = process.env.APP_ICON!;
const openFullscreen: boolean = process.env.OPEN_FULLSCREEN! === 'true';
const hideTitlebarBorder: boolean =
  process.env.HIDE_TITLEBAR_BORDER! === 'true';
const appInitialWidth: number = process.env.APP_INITIAL_WIDTH
  ? parseInt(process.env.APP_INITIAL_WIDTH)
  : 900;
const appInitialHeight: number = process.env.APP_INITIAL_HEIGHT
  ? parseInt(process.env.APP_INITIAL_HEIGHT)
  : 900;

export const devApp: DevAppType = {
  id: appId,
  title: appName,
  type: 'dev',
  color: appColor,
  icon: appIcon,
  web: {
    hideTitlebarBorder: hideTitlebarBorder,
    openFullscreen: openFullscreen,
    url: appUrl,
    development: true,
  },
  initial: {
    width: appInitialWidth,
    height: appInitialHeight,
  },
};
