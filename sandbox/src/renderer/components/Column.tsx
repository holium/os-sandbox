import styled from 'styled-components';
import { style, compose } from 'styled-system';
import { Box, BoxProps } from './Box';

type ColumnProps = BoxProps & {
  col?: number | (number | null | string)[];
  inset?: number | (number | null | string)[];
};

function transformValue(n: string | number) {
  if (!n || Number.isNaN(n as string | number)) {
    return n;
  }

  const cols = Number(n);
  return `${(cols / 12) * 100}%`;
}

const inset = style({
  prop: 'inset',
  cssProperty: 'marginLeft',
  transformValue,
});

const col = style({
  prop: 'col',
  cssProperty: 'width',
  transformValue,
});

export const Column = styled(Box)<Omit<ColumnProps, 'width'>>(
  compose(col, inset)
);

export default { Column };
