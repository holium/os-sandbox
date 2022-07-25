import {
  compose,
  space,
  layout,
  flexbox,
  border,
  position,
  color,
  typography,
  textStyle,
  textShadow,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  BorderProps,
  PositionProps,
  TypographyProps,
  TextStyleProps,
  TextShadowProps,
} from 'styled-system';

export type TypographyFunctionsProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BorderProps &
  PositionProps &
  TypographyProps &
  TextShadowProps &
  TextStyleProps;

export const typographyFunctions = compose(
  space,
  color,
  layout,
  flexbox,
  border,
  position,
  typography,
  textShadow,
  textStyle
);
