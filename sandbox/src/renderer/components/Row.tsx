/* eslint-disable no-param-reassign */
import * as React from 'react';
import { ThemeContext } from 'styled-components';
import { SpaceProps, WidthProps, FlexboxProps } from 'styled-system';

import { Flex } from './Flex';
import { Space } from './Space';

interface GutterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gutter: any[] | number;
}

type RowProps = FlexboxProps & GutterProps & SpaceProps & WidthProps;

export const Row: React.FC<RowProps> = ({ gutter, children, ...props }) => {
  // @ts-expect-error theme context should be good here
  const themeContext = React.useContext(ThemeContext);

  if (!gutter && themeContext && themeContext.grid) {
    gutter = themeContext.grid.gutter as number;
  }

  if (!gutter) {
    gutter = 15;
  }

  const spacing =
    gutter && Array.isArray(gutter)
      ? gutter.map((space) => space && space / 2)
      : (gutter as number) / 2;

  const mx =
    gutter && Array.isArray(gutter)
      ? gutter.map((space) => space && (space / 2) * -1)
      : ((gutter as number) / 2) * -1;

  // const filteredChildren = React.Children.toArray(children).filter(Boolean)

  return (
    <Flex mx={mx} flexWrap="wrap" {...props}>
      <Space px={spacing}>{children}</Space>
    </Flex>
  );
};

export default { Row };
