import React, { FC, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useDragControls } from 'framer-motion';
import { observer } from 'mobx-react';
import { darken } from 'polished';
import styled from 'styled-components';
import { ThemeType } from '../../theme';
import { Titlebar } from './Titlebar';
import { DevView } from './DevView';
import {
  DragHandleWrapper,
  LeftDragHandleStyle,
  RightDragHandleStyle,
} from './DragHandles';
import { Flex } from 'renderer/components';
import { useDev } from 'renderer/logic/store';

import { ThemeModelType, WindowModelProps } from '../../logic/types';
import { devApp } from 'renderer/development';

type AppWindowStyleProps = {
  theme: ThemeType;
  customBg?: string;
};

export const AppWindowStyle = styled(motion.div)<AppWindowStyleProps>`
  position: absolute;
  border-radius: 9px;
  box-sizing: content-box;
  transform: transale3d(0, 0, 0);
  box-shadow: ${(props: AppWindowStyleProps) => props.theme.elevations.two};
  border: 1px solid
    ${(props: AppWindowStyleProps) => darken(0.1, props.customBg!)};
`;

type AppWindowProps = {
  theme: ThemeModelType;
  window: WindowModelProps;
  hideTitlebar?: boolean;
  children?: React.ReactNode;
  desktopRef: any;
};

export const AppWindow: FC<AppWindowProps> = observer(
  (props: AppWindowProps) => {
    const { theme, window, desktopRef } = props;
    const { textColor, windowColor } = theme;
    const { isFullscreen, activeWindow, setAppDimensions, closeApp } = useDev();

    const [unmaximize, setUnmaximize] = useState<
      | {
          x: number;
          y: number;
          height: number;
          width: number;
        }
      | undefined
    >();
    const dragControls = useDragControls();
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const mX = useMotionValue(activeWindow ? activeWindow.dimensions.x : 20);
    const mY = useMotionValue(activeWindow ? activeWindow.dimensions.y : 20);
    const mHeight = useMotionValue(
      activeWindow ? activeWindow.dimensions.height : 600
    );
    const mWidth = useMotionValue(
      activeWindow ? activeWindow.dimensions.width : 600
    );

    useEffect(() => {
      mX.set(activeWindow.dimensions.x);
      mY.set(activeWindow.dimensions.y);
      mWidth.set(activeWindow.dimensions.width);
      mHeight.set(activeWindow.dimensions.height);
    }, [
      activeWindow.dimensions.width,
      activeWindow.dimensions.height,
      activeWindow.dimensions.x,
      activeWindow.dimensions.y,
    ]);

    const resizeRightX = useMotionValue(0);
    const resizeRightY = useMotionValue(0);

    const handleRBResize = useCallback((event, info) => {
      event.stopPropagation();
      event.preventDefault();
      // if we are greater than the minimum or are moving in the postive direction
      if (mWidth.get() >= 250 || info.delta.x > 0) {
        resizeRightX.set(resizeRightX.get() - info.offset.x);
        mWidth.set(mWidth.get() + info.delta.x);
      }
      if (mHeight.get() >= 250 || info.delta.y > 0) {
        resizeRightY.set(resizeRightY.get() - info.offset.y);
        mHeight.set(mHeight.get() + info.delta.y);
      }
    }, []);

    // Toggles maximize or not
    const maximize = useCallback(() => {
      if (!unmaximize) {
        setUnmaximize({
          x: mX.get(),
          y: mY.get(),
          height: mHeight.get(),
          width: mWidth.get(),
        });
        const offset = isFullscreen ? 0 : 30;
        // @ts-ignore
        const desktopDims = desktopRef.current!.getBoundingClientRect();
        mX.set(0);
        mY.set(8);
        mHeight.set(desktopDims.height - (16 + offset));
        mWidth.set(desktopDims.width - 18); // 16 + 2 for border width
      } else {
        mX.set(unmaximize.x);
        mY.set(unmaximize.y);
        mHeight.set(unmaximize.height);
        mWidth.set(unmaximize.width);
        setUnmaximize(undefined);
      }
      activeWindow &&
        setAppDimensions(activeWindow.id, {
          x: mX.get(),
          y: mY.get(),
          height: mHeight.get(),
          width: mWidth.get(),
        });
    }, [isFullscreen, activeWindow, unmaximize, setUnmaximize]);

    const onDragStop = () => {
      setIsDragging(false);
      activeWindow &&
        setAppDimensions(activeWindow.id, {
          x: mX.get(),
          y: mY.get(),
          height: mHeight.get(),
          width: mWidth.get(),
        });
    };

    const onDragStart = () => {
      setIsDragging(true);
    };
    let webviewId = `${activeWindow?.id}-dev-webview`;

    const onClose = () => {
      const webview: any = document.getElementById(webviewId);
      webview && webview.closeDevTools();
      closeApp();
      // activeWindow ? closeAppWindow('', toJS(activeWindow)) : {};
    };

    const onRefresh = () => {
      const webview: any = document.getElementById(webviewId);
      webview.reloadIgnoringCache();
      // activeWindow ? closeAppWindow('', toJS(activeWindow)) : {};
    };

    const onDevTools = () => {
      const webview: any = document.getElementById(webviewId);
      webview.isDevToolsOpened()
        ? webview.closeDevTools()
        : webview.openDevTools();
    };

    const onMouseDown = () => {
      // setActive('', window.id);
    };

    const windowId = `app-window-${activeWindow?.id}`;
    let hideTitlebarBorder = devApp.web!.hideTitlebarBorder!;
    let noTitlebar = devApp.web!.noTitlebar!;
    let showDevToolsToggle = true;
    let maximizeButton = true;
    let borderRadius = 12;
    let titlebar = (
      <Titlebar
        isAppWindow
        maximizeButton={maximizeButton}
        closeButton
        noTitlebar={noTitlebar}
        hasBorder={!hideTitlebarBorder}
        showDevToolsToggle={showDevToolsToggle}
        dragControls={dragControls}
        onDevTools={onDevTools}
        onDragStart={() => onDragStart()}
        onDragStop={() => onDragStop()}
        onRefresh={() => onRefresh()}
        onClose={() => onClose()}
        onMaximize={() => maximize()}
        theme={theme}
        app={window}
      />
    );

    return (
      <AppWindowStyle
        id={windowId}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 100 }}
        dragElastic={0}
        dragMomentum={false}
        // dragConstraints={desktopRef}
        dragListener={false}
        drag={!isResizing}
        dragControls={dragControls}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.15,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.1,
          },
        }}
        style={{
          x: mX,
          y: mY,
          width: mWidth,
          height: mHeight,
          zIndex: window.zIndex,
          borderRadius,
        }}
        color={textColor}
        customBg={windowColor}
        onMouseDown={onMouseDown}
      >
        <Flex
          flexDirection="column"
          style={{
            overflow: 'hidden',
            borderRadius: 10,
            height: 'inherit',
            width: 'inherit',
          }}
        >
          {titlebar}
          <WindowType
            hasTitlebar
            isResizing={isResizing}
            isDragging={isDragging}
            window={window}
          />
          <DragHandleWrapper>
            {/* <LeftDragHandleStyle
              className="app-window-resize app-window-resize-br"
              drag
              onDrag={handleLBResize}
              style={{
                x: resizeLeftX,
                y: resizeLeftY,
                background: 'red',
              }}
              onPointerDown={() => {
                setIsResizing(true);
              }}
              onPointerUp={() => {
                setIsResizing(false);
                activeWindow &&
                  setAppDimensions(activeWindow.id, {
                    x: mX.get(),
                    y: mY.get(),
                    height: mHeight.get(),
                    width: mWidth.get(),
                  });
              }}
              onPanEnd={() => setIsResizing(false)}
              onTap={() => setIsResizing(false)}
            /> */}
            <RightDragHandleStyle
              className="app-window-resize app-window-resize-bl"
              drag
              style={{
                x: resizeRightX,
                y: resizeRightY,
              }}
              onDrag={handleRBResize}
              onPointerDown={() => {
                setIsResizing(true);
              }}
              onPointerUp={() => {
                setIsResizing(false);
                activeWindow &&
                  setAppDimensions(activeWindow.id, {
                    x: mX.get(),
                    y: mY.get(),
                    height: mHeight.get(),
                    width: mWidth.get(),
                  });
              }}
              onPanEnd={() => setIsResizing(false)}
              onTap={() => setIsResizing(false)}
              // dragMomentum={true}
            />
          </DragHandleWrapper>
        </Flex>
      </AppWindowStyle>
    );
  }
);

AppWindow.defaultProps = {
  hideTitlebar: false,
};

export default AppWindow;

type WindowTypeProps = {
  hasTitlebar: boolean;
  isResizing: boolean;
  isDragging: boolean;
  window: WindowModelProps;
};

export const WindowType: FC<WindowTypeProps> = (props: WindowTypeProps) => {
  const { hasTitlebar, isResizing, isDragging, window } = props;
  switch (window.type) {
    case 'dev':
      return (
        <DevView
          hasTitlebar={hasTitlebar}
          isDragging={isDragging}
          isResizing={isResizing}
          window={window}
        />
      );
    default:
      return <div>No view</div>;
  }
};
