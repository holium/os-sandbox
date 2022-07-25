import styled, { css } from 'styled-components';

import { grid, GridProps } from 'styled-system';
import { Box } from '../../Box';
import type { ThemeType } from '../../../theme';

const Grid = styled(Box)<GridProps>(
  {
    display: 'grid',
  },
  grid
);

type FieldProps = GridProps & {
  theme: ThemeType;
  inline?: boolean;
};

export const Field: any = styled(Grid).attrs({
  gridGap: 1,
  role: 'group',
})<FieldProps>`
  ${(props: FieldProps) =>
    props.inline &&
    css`
      grid-gap: ${props.theme.space[4]}px;
      grid-template-columns: 2fr 4fr;
    `}
`;

Field.defaultProps = {
  border: 0,
  p: 0,
  ml: 0,
  mr: 0,
};

export const FieldSet: any = styled(Grid).attrs({
  gridGap: 4,
  as: 'fieldset',
})<GridProps>``;

FieldSet.defaultProps = {
  border: 0,
  p: 0,
  ml: 0,
  mr: 0,
};
