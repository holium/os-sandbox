import { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { ViewPort, Top, Layer } from 'react-spaces';
import { WindowManager } from './WindowManager';

const DragBar = styled.div`
  position: absolute;
  height: 22px;
  left: 0;
  top: 0;
  right: 0;
  --webkit-app-region: drag;
  app-region: drag;
`;

export const Shell: FC = observer(() => {
  return (
    <ViewPort>
      <Top size={40}>
        <DragBar />
      </Top>
      <WindowManager isOpen />
    </ViewPort>
  );
});

export default Shell;
