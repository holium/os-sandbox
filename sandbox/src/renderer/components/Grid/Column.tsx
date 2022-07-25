import styled, { css } from 'styled-components';
import { space, layout, SpaceProps, LayoutProps, compose } from 'styled-system';

import config, { DIMENSIONS } from './helpers';

type ColumnType = SpaceProps &
  LayoutProps & {
    xs?: number | string;
    sm?: number | string;
    md?: number | string;
    lg?: number | string;
    xl?: number | string;
    expand?: boolean;
    align?: string | object;
    justify?: string | object;
    order?: number | object;
    gap?: number;
    offset?: number | object;
    reverse?: boolean | Array<any>;
    noGutter?: boolean;
    children?: React.ReactNode;
    debug?: boolean;
  };

const Column = styled(styled.div<ColumnType>`
  box-sizing: border-box;
  flex: 1 0 auto;
  max-width: 100%;
  height: ${(p: ColumnType) =>
    p.marginTop ? `calc(100% - ${String(p.marginTop)})` : 'initial'};
  ${(props: ColumnType) =>
    props.gap &&
    css`
      gap: ${props.gap}px;
    `};
  display: flex;
  flex-direction: column;
  ${(p) =>
    p.expand &&
    css`
      height: initial;
    `}
  ${(p) =>
    !p.noGutter &&
    css`
      ${DIMENSIONS.map(
        (d) =>
          config(p).breakpoints[d] &&
          config(p).media[d]`
      padding-right: ${config(p).gutterWidth[d] / 2}rem;
      padding-left: ${config(p).gutterWidth[d] / 2}rem;
    `
      )}
    `}
  ${(p: any) => css`
    ${DIMENSIONS.map(
      (d) =>
        p[d] &&
        config(p).breakpoints[d] &&
        config(p).media[d]`
      flex: 1 1 ${(p[d] / config(p).columns[d]) * 100}%;
      max-width: ${(p[d] / config(p).columns[d]) * 100}%;
    `
    )}
  `}
  ${(p: any) =>
    p.offset &&
    css`
      ${DIMENSIONS.map(
        (d) =>
          config(p).breakpoints[d] &&
          config(p).media[d]`
    ${
      typeof p.offset === 'object'
        ? p.offset[d] !== undefined &&
          `margin-left: ${
            p.offset[d] > 0 ? (p.offset[d] / config(p).columns[d]) * 100 : 0
          }%`
        : `margin-left: ${(p.offset / config(p).columns.xs) * 100}%`
    };
    `
      )}
    `}
  ${(p: any) =>
    p.order !== undefined &&
    css`
      ${DIMENSIONS.map(
        (d) =>
          config(p).breakpoints[d] &&
          config(p).media[d]`
    ${
      typeof p.order === 'object'
        ? p.order[d] !== undefined && `order: ${p.order[d]}`
        : `order: ${p.order}`
    };
    `
      )}
    `}
  ${(p) =>
    p.reverse &&
    css`
      ${Array.isArray(p.reverse)
        ? DIMENSIONS.map(
            (d) =>
              config(p).breakpoints[d] &&
              config(p).media[d]`
        flex-direction: ${
          Array.isArray(p.reverse) && p.reverse.indexOf(d) !== -1
            ? 'column-reverse'
            : 'column'
        };
      `
          )
        : 'flex-direction: column-reverse;'}
    `}
  ${(p: any) =>
    p.align &&
    css`
      ${typeof p.align === 'object'
        ? DIMENSIONS.map(
            (d) =>
              config(p).breakpoints[d] &&
              config(p).media[d]`${p.align[d] && `align-items: ${p.align[d]}`}`
          )
        : `align-items: ${p.align};`}
    `}
  
  ${(p: any) =>
    p.justify &&
    css`
      ${typeof p.justify === 'object'
        ? DIMENSIONS.map(
            (d) =>
              config(p).breakpoints[d] &&
              config(p).media[d]`${
                p.justify[d] && `justify-content: ${p.justify[d]}`
              }`
          )
        : `justify-content: ${p.justify};`}
    `}
  
  ${({ debug }) =>
    debug &&
    css`
      background-color: #5901ad40;
      outline: #fff solid 1px;
    `}
`)<ColumnType>(compose(layout, space));

Column.displayName = 'Column';

Column.defaultProps = {
  debug: false,
  // xs: 4,
  // sm: 8,
  // md: 8,
  // lg: 12,
  // xl: 12,
};

export default Column;
