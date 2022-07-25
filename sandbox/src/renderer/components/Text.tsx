import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { variant } from 'styled-system';
import type { ThemeType } from '../theme';
import {
  TypographyFunctionsProps,
  typographyFunctions,
} from './typography-functions';
export type TextProps = {
  fontByName?: 'Rubik' | 'Oxanium' | 'Source Code Pro';
  fontByType?: 'body' | 'heading' | 'monospace';
  variant?:
    | 'body'
    | 'caption'
    | 'hint'
    | 'label'
    | 'patp'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit';
  theme?: ThemeType;
} & TypographyFunctionsProps;

const defaultTextStyles = {
  fontFamily: 'body',
  fontWeight: 'regular',
  lineHeight: 'solid',
  color: 'text.primary',
  mt: 0,
  mb: 0,
};

const textVariants = variant({
  variants: {
    h1: {
      ...defaultTextStyles,
      fontWeight: 'bold',
      lineHeight: 'copy',
      fontSize: 8,
    },
    h2: {
      ...defaultTextStyles,
      fontWeight: 'semiBold',
      lineHeight: 'copy',
      fontSize: 7,
    },
    h3: {
      ...defaultTextStyles,
      fontWeight: 'semiBold',
      lineHeight: 'title',
      fontSize: 6,
    },
    h4: {
      ...defaultTextStyles,
      fontWeight: 'medium',
      lineHeight: 'title',
      fontSize: 5,
    },
    h5: {
      ...defaultTextStyles,
      fontWeight: 'medium',
      lineHeight: 'title',
      fontSize: 4,
    },
    h6: {
      ...defaultTextStyles,
      fontWeight: 'regular',
      lineHeight: 'normal',
      fontSize: 3,
    },
    body: {
      ...defaultTextStyles,
      fontSize: 2,
    },
    caption: {
      ...defaultTextStyles,
      fontSize: 2,
    },
    hint: {
      ...defaultTextStyles,
      fontSize: 1,
    },
    label: {
      ...defaultTextStyles,
      fontFamily: 'heading',
      fontSize: 2,
      fontWeight: '400',
    },
    inherit: {
      mt: 0,
      mb: 0,
    },
    patp: {
      mt: 0,
      mb: 0,
      fontWeight: 400,
      fontFamily: 'monospace',
      color: 'text.primary',
      fontSize: 2,
    },
  },
});

export const Text = styled(motion.p)<TextProps>`
  ${textVariants}
  ${typographyFunctions};
  ${(props) =>
    props.fontByName &&
    css`
      font-family: ${props.theme.fontByName[props.fontByName]};
    `};
  ${(props) =>
    props.fontByType &&
    css`
      font-family: ${props.theme.fonts[props.fontByType]};
    `}
`;

Text.defaultProps = {
  variant: 'inherit',
};
