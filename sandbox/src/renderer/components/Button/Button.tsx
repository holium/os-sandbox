/* eslint-disable react/prop-types */
import { FC, forwardRef } from 'react';
import styled, { StyledComponentProps } from 'styled-components';
import {
  border,
  compose,
  flexbox,
  layout,
  position,
  background,
  space,
  color,
  variant,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  BackgroundProps,
  SpaceProps,
  ColorProps,
} from 'styled-system';
import { Spinner, Flex, IconButton } from '..';

export type StyledButtonProps = SpaceProps &
  LayoutProps &
  FlexboxProps &
  BorderProps &
  BackgroundProps &
  ColorProps &
  PositionProps & {
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    isLoading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'transparent' | 'minimal' | 'custom';
  };

const defaultButtonStyles = {
  position: 'relative',
  fontFamily: 'body',
  fontSize: 2,
  fontWeight: 'regular',
  lineHeight: 'solid',
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: 'solid',
  padding: 3,
  ml: 0,
  mr: 0,
  mb: 0,
  appearance: 'none',
  cursor: 'pointer',
};

const buttonVariants = variant({
  variants: {
    primary: {
      ...defaultButtonStyles,
      bg: 'brand.primary',
      color: 'text.white',
      borderColor: 'transparent',
      ' svg': {
        color: 'text.white',
      },
      transition: '0.2s ease',
      '&:hover': {
        transition: '0.2s ease',
        backgroundColor: 'highlights.primaryHighlight',
      },
      '&:active, &:focus': {
        transition: '0.2s ease',
        backgroundColor: 'highlights.primaryExtraHighlight',
        borderColor: 'transparent',
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'ui.disabled',
        borderColor: 'ui.disabled',
      },
    },
    secondary: {
      ...defaultButtonStyles,
      bg: 'bg.primary',
      color: 'ui.primary',
      borderColor: 'transparent',
      ' svg': {
        color: 'ui.secondary',
      },
      transition: '0.2s ease',
      '&:hover': {
        transition: '0.2s ease',
        borderColor: 'ui.input.borderColor',
      },
      '&:active, &:focus': {
        transition: '0.2s ease',
        borderColor: 'ui.input.borderHover',
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'bg.primary',
        borderColor: 'ui.disabled',
      },
    },
    minimal: {
      ...defaultButtonStyles,
      bg: 'brand.muted',
      color: 'brand.primary',
      fontWeight: 600,
      borderColor: 'transparent',
      ' svg': {
        color: 'brand.primary',
      },
      transition: '0.2s ease',
      '&:hover': {
        transition: '0.2s ease',
        borderColor: 'transparent',
      },
      '&:active, &:focus': {
        transition: '0.2s ease',
        borderColor: 'highlights.primaryExtraHighlight',
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'bg.primary',
        borderColor: 'ui.disabled',
      },
    },
    transparent: {
      ...defaultButtonStyles,
      bg: 'transparent',
      color: 'brand.primary',
      borderColor: 'transparent',
      transition: '0.2s ease',
      ' svg': {
        color: 'brand.primary',
      },
      '&:hover': {
        transition: '0.2s ease',
        backgroundColor: 'none',
      },
      '&:focus': {
        borderColor: 'transparent !important',
        outline: 'none',
      },
      '&:active, &:focus': {
        backgroundColor: 'hone',
        borderColor: 'transparent',
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'ui.disabled',
        borderColor: 'ui.disabled',
      },
    },
    custom: {
      ...defaultButtonStyles,
    },
  },
});

const StyledButton = styled.button<ButtonProps>`
  ${buttonVariants}
  ${compose(space, layout, color, background, flexbox, border, position)}
`;

export type ButtonProps = StyledComponentProps<
  'button',
  any,
  StyledButtonProps,
  never
>;

export const Button: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props: ButtonProps, ref) => {
  const {
    leftIcon,
    rightIcon,
    disabled,
    isLoading,
    children,
    mb,
    mt,
    mx,
    my,
    ml,
    mr,
  } = props;
  return (
    <StyledButton
      ref={ref}
      py={2}
      disabled={disabled}
      isLoading={isLoading}
      {...props}
      mx={mx}
      my={my}
      mb={mb}
      mt={mt}
      ml={ml}
      mr={mr}
    >
      {isLoading && (
        <Spinner
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          size={0}
          color="brand.primary"
        />
      )}
      <Flex
        alignItems="center"
        position="relative"
        justifyContent="center"
        opacity={isLoading ? 0 : 1}
      >
        {leftIcon && (
          <IconButton disabled={disabled} mr={2}>
            {leftIcon}
          </IconButton>
        )}
        {children}
        {rightIcon && (
          <IconButton disabled={disabled} ml={2}>
            {rightIcon}
          </IconButton>
        )}
      </Flex>
    </StyledButton>
  );
});

Button.defaultProps = {
  variant: 'primary',
};
