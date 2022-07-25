import * as React from 'react';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { DisplayProps, HeightProps } from 'styled-system';
import { Box } from './Box';

type ContainProps = DisplayProps & HeightProps;

export const Contain: React.FC<ContainProps> = (props: ContainProps) => {
  // @ts-expect-error ThemeContext should work here.
  const themeContext = useContext(ThemeContext);

  return (
    <Box
      mx="auto"
      px={
        themeContext &&
        themeContext.grid &&
        themeContext.grid.container &&
        themeContext.grid.container.padding
      }
      maxWidth={
        themeContext &&
        themeContext.grid &&
        themeContext.grid.container &&
        themeContext.grid.container.maxWidth
      }
      {...props}
    />
  );
};

export default Contain;
