import React, { FC, forwardRef } from 'react';
import styled, { css, StyledComponentProps } from 'styled-components';
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
  HeightProps,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  BackgroundProps,
  SpaceProps,
  ColorProps,
  height,
} from 'styled-system';
import { darken } from 'polished';
import { ThemeType } from '../theme';

// import { Spinner, Flex } from '.';

// const defaultButtonStyles = {
//   position: 'relative',
//   fontFamily: 'body',
//   fontSize: 2,
//   fontWeight: 'regular',
//   lineHeight: 'solid',
//   borderRadius: 4,
//   borderWidth: 1,
//   borderStyle: 'solid',
//   boxShadow: 'none',
//   padding: 3,
//   ml: 0,
//   mr: 0,
//   mb: 0,
//   // appearance: 'none',
//   cursor: 'pointer',
// };
// const buttonVariants = variant({
//   variants: {
//     minimal: {
// ...defaultButtonStyles,
// bg: 'brand.muted',
// color: 'brand.primary',
// fontWeight: 600,
// borderColor: 'transparent',
// textAlign: 'left',
// ' svg': {
//   color: 'brand.primary',
// },
// transition: '0.2s ease',
// '&:hover': {
//   transition: '0.2s ease',
//   borderColor: 'transparent',
// },
// '&:active, &:focus': {
//   transition: '0.2s ease',
//   borderColor: 'highlights.primaryExtraHighlight',
// },
// '&:disabled': {
//   color: 'text.disabled',
//   backgroundColor: 'bg.primary',
//   borderColor: 'ui.disabled',
// },
//     },
//   },
// });

type ActionButtonProps = {
  // variant: 'minimal';
  theme: ThemeType;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
} & HeightProps &
  SpaceProps;

export type ButtonProps = StyledComponentProps<
  'button',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ActionButtonProps,
  never
>;

// const StyledButton = styled.button(
//   styled.button`
//     ${(props) => css`
//       appearance: none;
//       border-radius: 4px;
//       background: ${props.theme.colors.brand.muted};
//     `}
//   `,
//   compose(space, layout, color, background, flexbox, border, position)
// );

const StyledButton = styled.button`
  ${(props: ActionButtonProps) => css`
    appearance: none;
    decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    border-color: transparent;
    box-shadow: none;
    text-align: left;
    font-size: 16px;
    padding: 4px 12px;
    transition: ${props.theme.transition};
    line-height: ${props.theme.lineHeights.solid}
    font-family: ${props.theme.fonts.body};
    font-weight: 500;
    color: ${props.theme.colors.brand.primary};
    background: ${props.theme.colors.brand.muted};
    &:hover {
      background: ${darken(0.1, props.theme.colors.brand.muted)};
    }
    &:active {
      background: ${darken(0.15, props.theme.colors.brand.muted)};
    }
  `}
  ${compose(height, space)}
`;

export const ActionButton: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props: ButtonProps, ref) => {
  // eslint-disable-next-line react/prop-types
  const { disabled, children, rightContent } = props;
  return (
    <StyledButton ref={ref} disabled={disabled} {...props}>
      {children} {rightContent}
    </StyledButton>
  );
});

ActionButton.defaultProps = {
  rightContent: null,
};

export default ActionButton;
