import { ThemeProvider } from 'styled-components';
import { MotionConfig } from 'framer-motion';
import { GlobalStyle } from './app.styles';
import { FC } from 'react';
import { observer } from 'mobx-react';
import { theme as BaseTheme } from './theme';
import { DevProvider, devStore, useDev } from './logic/store';

import styled from 'styled-components';
import { ViewPort, Top } from 'react-spaces';
import { WindowManager } from './system/WindowManager';

const DragBar = styled.div`
  position: absolute;
  z-index: 10;
  height: 22px;
  left: 0;
  top: 0;
  right: 0;
  --webkit-app-region: drag;
  &:hover {
    cursor: grab;
  }
`;

export const App: FC = observer(() => {
  const { theme, baseThemeMode } = useDev();
  return (
    <DevProvider value={devStore}>
      <ThemeProvider theme={BaseTheme[baseThemeMode]}>
        <MotionConfig transition={{ duration: 1, reducedMotion: 'user' }}>
          <GlobalStyle osTheme={theme} blur={true} />
          <ViewPort>
            <Top size={40}>
              <DragBar />
            </Top>
            <WindowManager isOpen />
          </ViewPort>
        </MotionConfig>
      </ThemeProvider>
    </DevProvider>
  );
});

export default App;
