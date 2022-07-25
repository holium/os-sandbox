// eslint-disable-next-line import/no-unresolved
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import { Text, TextProps } from './Text';

export type HeadingProps = TextProps &
  HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };

export const Heading = styled(Text)<HeadingProps>({});

Heading.defaultProps = {
  as: 'h2',
};
