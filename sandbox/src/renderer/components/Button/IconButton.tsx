import styled, { css } from 'styled-components';
import {
  compose,
  space,
  layout,
  size,
  color,
  SizeProps,
  typography,
  SpaceProps,
  ColorProps,
  LayoutProps,
  TypographyProps,
} from 'styled-system';
import { motion } from 'framer-motion';
import { rgba, darken, lighten } from 'polished';
import type { ThemeType } from '../../theme';

type IProps = {
  ref?: unknown;
  isDisabled?: boolean;
  customBg?: string;
  hoverFill?: string;
  hoverReveal?: boolean;
  canFocus?: boolean;
  size?: number;
  luminosity?: 'light' | 'dark';
  theme: ThemeType;
  color?: string; // hacky fix for linting error
} & SpaceProps &
  ColorProps &
  LayoutProps &
  SizeProps &
  TypographyProps;

export const IconButton = styled(styled(motion.button)<IProps>`
  border: 1px solid transparent;
  background-color: transparent;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  pointer-events: auto;
  cursor: pointer;
  will-change: transform;
  height: ${(props: IProps) => `${props.size}px`};
  width: ${(props: IProps) => `${props.size}px`};
  svg {
    fill: ${(props: IProps) => props.color || props.theme.colors.icon.app};
    pointer-events: none;
    height: ${(props: IProps) => `${props.size! - props.theme.space[1]}px`};
    width: ${(props: IProps) => `${props.size! - props.theme.space[1]}px`};
  }
  /* border: 1px solid transparent; */
  border-radius: ${(props) => props.theme.containers.innerBorderRadius}px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  outline: none;
  transition: ${(props: IProps) => props.theme.transitionFast};

  &:active {
    transition: ${(props: IProps) => props.theme.transitionFast};
    svg {
      fill: ${(props: IProps) => props.theme.colors.brand.primary};
    }
  }

  ${(props: IProps) =>
    props.hoverReveal
      ? css`
          opacity: 0;
          transition: ${props.theme.transitionFast};
          padding: 3px;
          background: transparent;
          &:hover {
            transition: ${props.theme.transitionFast};
            transform: translateZ(0);
            opacity: 0.5;
            background: ${props.theme.colors.highlights.bgHighlight};
          }
        `
      : css`
          transition: ${props.theme.transitionFast};
          &:hover {
            transition: ${props.theme.transitionFast};
            transform: translateZ(0);
            background: ${props.luminosity
              ? props.theme.colors.highlights.bgClearHighlight
              : props.theme.colors.highlights.bgHighlight};
            svg {
              fill: ${props.color || rgba(props.theme.colors.icon.app, 0.7)};
            }
          }
        `}
  ${(props: IProps) =>
    props.canFocus &&
    css`
      &:focus,
      &:active {
        transform: translateZ(0);
        transition: ${props.theme.transition};
        outline: none;
        svg {
          fill: ${darken(
            0.1,
            props.customBg || props.theme.colors.brand.primary
          )};
        }
      }
    `}
  ${(props: IProps) =>
    props.customBg &&
    !props.isDisabled &&
    css`
      transition: ${props.theme.transitionFast};

      &:hover {
        transform: translateZ(0);
        transition: ${(props: IProps) => props.theme.transitionFast};
        background-color: ${props.customBg
          ? darken(0.0, props.customBg)
          : 'inherit'};
      }
    `}

    ${(props: IProps) =>
    props.hoverFill &&
    css`
      &:hover {
        transform: translateZ(0);
        transition: ${props.theme.transitionFast};
        color: ${props.hoverFill};
        svg {
          fill: ${props.hoverFill};
        }
      }
    `}

   ${(props: IProps) =>
    props.isDisabled &&
    css`
      color: ${(props) => props.theme.colors.ui.disabled};
      background-color: transparent;
      border-color: transparent;
      svg {
        fill: ${(props) => props.theme.colors.ui.disabled};
      }
      &:hover {
        transform: translateZ(0);
        color: ${(props) => props.theme.colors.ui.disabled};
        background-color: none;
        border-color: none;
      }
    `}
`)<IProps>(
  {
    // '&:hover': {
    //   // @ts-expect-error stupid
    //   backgroundColor: (props: IProps) =>
    //     props.customBg ? darken(0.22, props.customBg) : 'initial',
    // },
  },
  compose(space, size, color, layout, typography)
);

IconButton.defaultProps = {
  size: 24,
  canFocus: false,
  isDisabled: false,
};
