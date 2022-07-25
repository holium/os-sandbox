import styled from 'styled-components';
import {
  border,
  BorderProps,
  ShadowProps,
  shadow,
  compose,
} from 'styled-system';
import { ThemeType } from '../theme';

import { Box, BoxProps } from './Box';

export type CardProps = {
  theme: ThemeType;
  customBg?: string;
  elevation?: 'none' | 'one' | 'two' | 'three' | 'lifted';
} & BoxProps &
  BorderProps &
  ShadowProps;

export const Card = styled(styled(Box)`
  display: flex;
  background: ${(props: CardProps) =>
    props.customBg || props.theme.colors.bg.primary};
  border: 1px solid ${(props: CardProps) => props.theme.colors.ui.borderColor};
  transition: ${(props: CardProps) => props.theme.transition};
  box-sizing: border-box;
  box-shadow: ${(props: CardProps) =>
    props.theme.elevations[props.elevation || 'one']};
  border-radius: 12px;
`)<CardProps>(compose(border, shadow));
