/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
// https://www.cssscript.com/demo/beautiful-creative-loaders/

import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import {
  compose,
  space,
  color,
  layout,
  flexbox,
  typography,
  position,
  PositionProps,
  FlexboxProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
  TypographyProps,
} from 'styled-system';
import { Box } from './Box';

export type SimpleSpinnerProps = SpaceProps &
  ColorProps &
  LayoutProps &
  TypographyProps &
  FlexboxProps &
  PositionProps;

const sizes = [16, 24, 32, 40, 48, 56, 64, 72, 80, 88];

const SimpleSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: ${(props: any) => (props.size < 2 ? 1 : 5)}px solid
    ${(props) => rgba(props.theme.colors.ui.secondary, 0.2)};
  border-bottom-color: ${(props) => props.theme.colors.brand.secondary};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SimpleSpinnerComposed = styled(SimpleSpinner)<SimpleSpinnerProps>(
  {
    display: 'flex',
  },
  compose(space, color, layout, flexbox, position, typography)
);

export interface SpinnerProps {
  block?: boolean;
  title?: string;
  color?: string;
  size: number;
}

const defaultProps = {
  block: true,
  size: 4,
  title: 'Loading…',
  color: 'ui.primary',
};

export const Spinner = React.memo(
  ({
    block,
    title,
    size,
    color,
    ...props
  }: SimpleSpinnerProps & SpinnerProps = defaultProps) => (
    <Box display={block ? 'block' : 'inline-block'} {...props}>
      <SimpleSpinnerComposed title={title} size={sizes[size]} color={color} />
      {/* <RotatingLoader title={title} fontSize={size} color={color} /> */}
    </Box>
  )
);
