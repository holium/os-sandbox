import React, { forwardRef } from 'react';
import styled, { StyledComponentProps } from 'styled-components';
import { darken, rgba } from 'polished';
import {
  compose,
  space,
  layout,
  flexbox,
  border,
  position,
  color,
} from 'styled-system';
import { Flex, Text, Box, BoxProps } from '..';
import { TypographyFunctionsProps } from '../typography-functions';
import type { ThemeType } from '../../theme';

const inputTokens = {
  iconSize: 4, // icon size on font-size scale
  y: 2, // padding y
  x: 2, // padding x
};

export type InlineEditProps = StyledComponentProps<
  'input',
  any,
  {
    customBg?: string;
    /** Icon or ‘Interactive Icon’ adornment to apply to the left of the content area */
    leftIcon?: JSX.Element;
    /** Icon or ‘Interactive Icon’ adornment to apply to the right of the content area */
    rightIcon?: JSX.Element;
    /** Does the input have a validation error */
    error?: boolean;
  } & TypographyFunctionsProps,
  never
> & { theme: ThemeType };

const ContentArea: any = styled(Text)<
  {
    customBg?: string;
    hasLeftIcon: boolean;
    hasRightIcon: boolean;
    error?: boolean;
  } & TypographyFunctionsProps
>`
  display: block;
  width: 100%;
  appearance: none;
  transition: ${(props) => props.theme.transition};
  border-radius: ${(props) => props.theme.colors.ui.input.outerBorderRadius}px;

  padding-left: 0px;

  padding-right: ${(props) =>
    props.hasRightIcon
      ? inputTokens.iconSize + 2 * props.theme.space[inputTokens.x]
      : props.theme.space[inputTokens.x]}px;

  &::placeholder {
    color: ${(props) => props.theme.colors.text.placeholder};
  }

  &:hover {
    transition: ${(props) => props.theme.transition};
    background: ${(props: { theme: ThemeType; customBg?: string }) =>
      props.customBg
        ? rgba(props.customBg, 0.6)
        : darken(0.05, props.theme.colors.ui.tertiary)};
    padding-left: ${(props) =>
      props.hasLeftIcon
        ? inputTokens.iconSize + (2 * props.theme.space[inputTokens.x]) / 2
        : props.theme.space[inputTokens.x]}px;
    padding-right: ${(props) =>
      props.hasRightIcon
        ? inputTokens.iconSize + 2 * props.theme.space[inputTokens.x]
        : props.theme.space[inputTokens.x] -
          props.theme.space[inputTokens.x]}px;
  }

  &:focus {
    outline: none;
    &::placeholder {
      color: transparent;
    }
    background: ${(props: { theme: ThemeType; customBg?: string }) =>
      props.customBg || darken(0.05, props.theme.colors.ui.tertiary)};
    padding-left: ${(props) =>
      props.hasLeftIcon
        ? inputTokens.iconSize + 2 * props.theme.space[inputTokens.x]
        : props.theme.space[inputTokens.x]}px;
    padding-right: ${(props) =>
      props.hasRightIcon
        ? inputTokens.iconSize + 2 * props.theme.space[inputTokens.x]
        : props.theme.space[inputTokens.x] -
          props.theme.space[inputTokens.x]}px;
  }

  &:-moz-read-only {
    background-color: ${(props) => props.theme.colors.ui.tertiary};
    border-color: ${(props) => props.theme.colors.ui.input.borderColor};
  }

  &:read-only {
    background-color: ${(props) => props.theme.colors.ui.tertiary};
    border-color: ${(props) => props.theme.colors.ui.input.borderColor};

    &::placeholder {
      color: ${(props) => props.theme.colors.text.placeholder};
    }
  }

  &:disabled {
    -webkit-text-fill-color: currentColor; /* set text fill to current color for safari */
    opacity: 0.5;
    color: ${(props) => props.theme.colors.text.disabled};
    background-color: transparent;
    border-color: transparent;

    &::placeholder {
      color: ${(props) => props.theme.colors.text.disabled};
      opacity: 1;
    }
  }

  ${compose(space, layout, flexbox, border, position, color)}
`;

ContentArea.defaultProps = {
  pt: inputTokens.y,
  pb: inputTokens.y,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderRadius: 4,
  color: 'text.primary',
  bg: 'transparent',
  mb: 0,
};

const LeftIcon: any = styled(Box)<BoxProps & { disabled?: boolean }>`
  position: absolute;
  svg {
    display: block;
    font-size: ${(props) => props.theme.fontSizes[3]};
    color: ${(props) =>
      props.disabled
        ? props.theme.colors.text.disabled
        : props.theme.colors.text.primary};
  }
`;

const RightIcon: any = styled(Box)<BoxProps & { disabled?: boolean }>`
  position: absolute;
  svg {
    display: block;
    font-size: ${(props) => props.theme.fontSizes[3]};
    ${(props) => props.disabled && { color: props.theme.colors.text.disabled }};
  }
`;

export const InlineEdit: any = forwardRef<HTMLInputElement, InlineEditProps>(
  (
    { leftIcon, rightIcon, flex, mb, mt, mx, my, ml, mr, disabled, ...props },
    ref
  ) => {
    if (!ref) ref = React.createRef();
    const keypressHandler = (event: any) => {
      if (event.key === 'Enter') {
        // @ts-ignore
        ref.current.blur();
      }
    };
    return (
      <Flex
        alignItems="center"
        position="relative"
        mx={mx}
        my={my}
        mb={mb}
        mt={mt}
        ml={ml}
        mr={mr}
        flex={flex}
      >
        {leftIcon && (
          <LeftIcon left={inputTokens.x} disabled={disabled}>
            {leftIcon}
          </LeftIcon>
        )}
        <ContentArea
          as="input"
          variant="body"
          ref={ref}
          py={2}
          hasLeftIcon={!!leftIcon}
          hasRightIcon={!!rightIcon}
          disabled={disabled}
          aria-invalid={props.error ? 'true' : 'false'}
          onKeyPress={(event: any) => keypressHandler(event)}
          {...props}
        />
        {rightIcon && (
          <RightIcon right={inputTokens.x} disabled={disabled}>
            {rightIcon}
          </RightIcon>
        )}
      </Flex>
    );
  }
);

InlineEdit.defaultProps = {
  error: false,
  type: 'text',
};
