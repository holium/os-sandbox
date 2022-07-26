import React, { forwardRef } from 'react';
import styled, { css, StyledComponentProps } from 'styled-components';
import { Text } from '../Text';
import { Icons } from '../Icons';
import { Box, BoxProps } from '../Box';

const checkboxIconStyles = css<{ error?: Boolean }>`
  color: ${(props) =>
    props.error
      ? props.theme.colors.ui.intent.alert
      : props.theme.colors.ui.borderHover};

  font-size: ${(props) => props.theme.fontSizes[4]};
  margin-right: ${(props) => props.theme.space[1]}px;

  &:hover {
    color: ${(props) =>
      props.error
        ? props.theme.colors.ui.intent.alert
        : props.theme.colors.text.tertiary};
  }

  input:focus ~ & {
    color: ${(props) =>
      props.error
        ? props.theme.colors.ui.intent.alert
        : props.theme.colors.brand.primary};
  }

  input:checked:disabled ~ &,
  input:disabled ~ & {
    color: ${(props) => props.theme.colors.ui.disabled};
  }

  input:checked ~ & {
    fill: ${(props) =>
      props.error
        ? props.theme.colors.ui.intent.alert
        : props.theme.colors.brand.primary};
    color: ${(props) =>
      props.error
        ? props.theme.colors.ui.intent.alert
        : props.theme.colors.brand.primary};
  }
`;

const CheckboxUnchecked = styled(Icons)`
  display: none;

  input:checked ~ & {
    display: block;
  }

  ${checkboxIconStyles}
`;

const CheckboxChecked = styled(Icons)`
  display: block;

  input:checked ~ & {
    display: none;
  }

  ${checkboxIconStyles}
`;

const CheckboxIcon = (props: any) => (
  <>
    <CheckboxUnchecked name="CheckboxBlank" {...props} />
    <CheckboxChecked name="CheckboxChecked" {...props} />
  </>
);

export type CheckboxProps = StyledComponentProps<
  'input',
  any,
  { label: string; error?: Boolean } & BoxProps,
  never
>;

export const Checkbox: any = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { children, label, disabled, error, mb, mt, mx, my, ml, mr, ...props },
    ref
  ) => (
    <Text
      as="label"
      variant="body"
      display="flex"
      alignItems="center"
      color={disabled ? 'text.disabled' : 'text.primary'}
      mx={mx}
      my={my}
      mb={mb}
      mt={mt}
      ml={ml}
      mr={mr}
    >
      <Box display="inline-block">
        <Box
          ref={ref}
          as="input"
          type="checkbox"
          disabled={disabled}
          {...props}
          position="absolute"
          opacity={0}
          zIndex={-1}
          width={1}
          height={1}
          overflow="hidden"
          aria-invalid={error ? 'true' : 'false'}
        />
        <Box
          as={CheckboxIcon}
          display="inline-block"
          aria-hidden="true"
          disabled={disabled}
          error={error}
        />
      </Box>
      {label}
    </Text>
  )
);

Checkbox.defaultProps = {};
