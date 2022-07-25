import { devApp, DevAppType } from 'renderer/development';

/**
 * getCenteredXY
 *
 * Calculates the x and y of a centered window based on the height and width
 *
 * @param appDimensions
 * @param desktopDimensions
 * @returns { x: number; y: number }
 */
export const getCenteredXY = (
  appDimensions: {
    width: number;
    height: number;
  },
  desktopDimensions: { width: number; height: number },
  isFullscreen?: boolean
): { x: number; y: number } => {
  const appWidth = appDimensions.width;
  const appHeight = appDimensions.height;
  const desktopWidth = desktopDimensions.width;
  const desktopHeight = desktopDimensions.height;
  const offset = isFullscreen ? 0 : 40;

  const x = desktopWidth / 2 - appWidth / 2;
  const y = desktopHeight / 2 - appHeight / 2 - offset;

  return { x, y };
};

/**
 * getFullscreenDimensions
 *
 * Uses the window height and width to calculate a fullscreen window position.
 *
 * @param isFullscreen
 * @returns { x: number; y: number; width: number; height: number }
 */
export const getFullscreenDimensions = (
  desktopDimensions: { width: number; height: number },
  isFullscreen?: boolean
): { x: number; y: number; width: number; height: number } => {
  const offset = isFullscreen ? 0 : 40;
  const { width, height } = desktopDimensions;
  const windowHeight = height - (16 + offset);
  const windowWidth = width - 16;
  return {
    x: 0,
    y: 8,
    width: windowWidth,
    height: windowHeight,
  };
};

/**
 * getCenteredDimensions
 *
 * Calculates the position of a window opened with default dimensions and centered
 *
 * @param app
 * @returns { x: number; y: number; width: number; height: number }
 */
export const getCenteredDimensions = (
  app: any,
  desktopDimensions: { width: number; height: number },
  isFullscreen?: boolean
): { x: number; y: number; width: number; height: number } => {
  const { width, height } = desktopDimensions;
  const defaultAppDimensions = {
    width: devApp ? devApp.initial.width : 600,
    height: devApp ? devApp.initial.height : 600,
  };
  const defaultXY = getCenteredXY(
    defaultAppDimensions,
    { width, height },
    isFullscreen
  );
  return {
    x: defaultXY.x,
    y: defaultXY.y,
    width: app.dimensions ? app.dimensions.width : defaultAppDimensions.width,
    height: app.dimensions
      ? app.dimensions.height
      : defaultAppDimensions.height,
  };
};

/**
 * getInitialWindowDimensions
 *
 * Determines how the window should be opened, centered or fullscreen, and then
 * calculates the window x, y, width, and height
 *
 * @param app
 * @param isFullscreen
 * @returns dimensions: { x: number; y: number; width: number; height: number }
 */
export const getInitialWindowDimensions = (
  app: any,
  desktopDimensions: { width: number; height: number },
  isFullscreen?: boolean
): { x: number; y: number; width: number; height: number } => {
  let dimensions: { x: number; y: number; width: number; height: number };

  switch (app.type) {
    case 'dev':
      const webApp: DevAppType = app;
      if (webApp.web?.openFullscreen) {
        dimensions = getFullscreenDimensions(desktopDimensions, isFullscreen);
        break;
      }
      dimensions = getCenteredDimensions(
        webApp,
        desktopDimensions,
        isFullscreen
      );
      break;
  }
  return dimensions!;
};
