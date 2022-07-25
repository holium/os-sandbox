import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import {
  compose,
  space,
  color,
  layout,
  width,
  height,
  typography,
  WidthProps,
  HeightProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
  TypographyProps,
} from 'styled-system';
import { IconPathsType, paths } from './icons';
import { uuid } from './uuid';

export type IconProps = SpaceProps &
  ColorProps &
  LayoutProps &
  TypographyProps &
  WidthProps &
  HeightProps;
const SvgComponent = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & {
    name: IconPathsType;
    title?: string;
  }
>(({ title, name, ...props }, svgRef) => {
  const [titleId] = useState(() => (title ? uuid() : undefined));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={props.width || '1em'}
      height={props.height || '1em'}
      fill={props.color ? props.color : 'currentcolor'}
      ref={svgRef}
      aria-labelledby={titleId}
      pointerEvents="none"
      // onClick={(evt: any) => evt.stopPropagation()}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {paths[name]}
    </svg>
  );
});

export const Icons = styled(SvgComponent)<IconProps>`
  flex: none;
  vertical-align: middle;
  ${compose(space, color, width, height, layout, typography)}
`;

export default Icons;
