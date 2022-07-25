import styled, { css } from 'styled-components';
import config, { DIMENSIONS } from './helpers';

type RowType = {
  expand?: boolean;
  reverse?: boolean | Array<any>;
  align?: string | object;
  justify?: string | object;
  children?: React.ReactNode;
  noGutter?: boolean;
  debug?: boolean;
};

const Row = styled.div<RowType>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  flex-wrap: wrap;
  ${(p) =>
    p.expand &&
    css`
      width: 100%;
      height: 100%;
    `}
  ${(p) =>
    !p.noGutter &&
    css`
      ${DIMENSIONS.map(
        (d) =>
          config(p).container[d] &&
          config(p).media[d]`
      margin-left: -${config(p).gutterWidth[d] / 2}rem;
      margin-right: -${config(p).gutterWidth[d] / 2}rem;
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
         ${
           Array.isArray(p.reverse) && p.reverse.indexOf(d) !== -1
             ? `
             flex-direction: row-reverse;
             flex-wrap: wrap-reverse;
             `
             : `
                 flex-direction: row;
                 flex-wrap: wrap;
               `
         };
        
      `
          )
        : `
            flex-direction: row-reverse;
            flex-wrap: wrap-reverse;
          `}
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
`;

Row.displayName = 'Row';

Row.defaultProps = {
  debug: false,
};

export default Row;
