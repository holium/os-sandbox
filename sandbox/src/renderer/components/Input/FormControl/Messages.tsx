import styled from 'styled-components';
import { Text, TextProps } from '../../Text';

export const Hint: any = styled(Text).attrs({
  variant: 'hint',
  color: 'text.secondary',
})<TextProps>``;

export const Error: any = styled(Text).attrs({
  variant: 'hint',
  color: 'ui.intent.alert',
})<TextProps>``;
