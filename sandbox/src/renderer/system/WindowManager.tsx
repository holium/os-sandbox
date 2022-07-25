import { FC, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { motion } from 'framer-motion';
import AppWindow from './Window';
import { useDev } from 'renderer/logic/store';
import { Button, Flex } from 'renderer/components';

type WindowManagerProps = {
  isOpen?: boolean;
};

export const WindowManager: FC<WindowManagerProps> = observer(
  (props: WindowManagerProps) => {
    const { isOpen } = props;
    const {
      isFullscreen,
      theme,
      activeWindow,
      baseThemeMode,
      setThemeMode,
      openApp,
      setDesktopDimensions,
    } = useDev();

    const desktopRef = useRef<any>(null);

    useEffect(() => {
      const dims = desktopRef.current?.getBoundingClientRect();
      setDesktopDimensions(dims.width, dims.height);
    }, [desktopRef.current]);

    return (
      <motion.div
        id="desktop-fill"
        ref={desktopRef}
        animate={{
          display: isOpen ? 'block' : 'none',
        }}
        style={{
          bottom: 0,
          padding: '8px',
          position: 'absolute',
          transform: 'transale3d(0,0,0)', // forces gpu rendering
          left: 0,
          top: 0,
          right: 0,
          height: `calc(100vh - ${0}px)`,
          paddingTop: isFullscreen ? 0 : 30,
        }}
      >
        <Flex
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          top={0}
          zIndex={1}
          flex={1}
          height="100%"
          justifyContent="center"
          alignItems="center"
          gap={12}
        >
          <Button onClick={() => openApp()}>Open app</Button>
          <Flex
            position="absolute"
            left={0}
            right={0}
            bottom={30}
            zIndex={1}
            flex={1}
            width="100%"
            justifyContent="center"
            alignItems="center"
            gap={12}
          >
            <Button
              variant="secondary"
              onClick={() =>
                setThemeMode(baseThemeMode === 'light' ? 'dark' : 'light')
              }
            >
              Toggle Theme: {baseThemeMode}
            </Button>
          </Flex>
        </Flex>

        {activeWindow.isOpen && (
          <AppWindow
            desktopRef={desktopRef}
            window={activeWindow}
            theme={theme}
          />
        )}
      </motion.div>
    );
  }
);
