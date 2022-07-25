import { darken, rgba, lighten } from 'polished';
import styled, { css } from 'styled-components';
import {
  compose,
  space,
  layout,
  flexbox,
  border,
  position,
  color,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  BorderProps,
  PositionProps,
  FontSizeProps,
} from 'styled-system';
import type { ThemeType } from '../../theme';
import { IntentProps } from './MenuItem';

export type StyleProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FontSizeProps &
  FlexboxProps &
  BorderProps &
  PositionProps &
  IntentProps & {
    theme: ThemeType;
    customBg?: string;
    highlightType?: 'neutral' | 'brand' | null;
    selected?: boolean;
    disabled?: boolean;
    interaction?: boolean;
  };

// TODO make variants
export const MenuItemStyle: any = styled(styled.li`
  display: flex;
  align-items: flex-start;
  background: inherit;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  padding: 8px;
  font-size: 14px;
  /* margin: 0px 4px; */
  border-radius: ${(props) => props.theme.containers.outerBorderRadius}px;
  /* color: ${(props: StyleProps) =>
    props.intent
      ? (props.intent === 'primary' && props.theme.colors.brand.primary) ||
        // @ts-expect-error stop
        props.theme.colors.ui.intent[props.intent]
      : props.theme.colors.text.secondary}; */
  transition: ${(props: StyleProps) => props.theme.transition};
  svg {
    fill: currentcolor;
  }
  pointer-events: auto;

  /* Not disabled */
  ${(props: StyleProps) =>
    !props.disabled &&
    css`
      &:hover:not([disabled]) {
        transition: ${props.theme.transition};
        background: ${props.highlightType === 'brand' &&
        props.theme.colors.brand.primary};
        /* color: ${props.intent
          ? (props.intent === 'primary' && props.theme.colors.brand.primary) ||
            // @ts-expect-error stop
            props.theme.colors.ui.intent[props.intent]
          : props.theme.colors.text.secondary}; */
      }
    `}

  /* Disabled */
  ${(props: StyleProps) =>
    props.disabled &&
    css`
      -webkit-text-fill-color: currentColor; /* set text fill to current color for safari */
      color: ${rgba(props.theme.colors.text.disabled, 0.7)};
      border-color: ${props.theme.colors.ui.disabled};
      opacity: 0.7;
      cursor: default;
      &:focus {
        outline: none;
        border-color: transparent;
      }
      background: transparent;
    `};

  ${(props: StyleProps) =>
    props.customBg &&
    css`
      background-color: transparent;
      &:hover:not([disabled]) {
        background-color: ${darken(0.035, props.customBg)};
      }
    `}
`)<StyleProps>(compose(space, color, layout, flexbox, border, position));

export const ChildrenBox = styled(styled.div`
  width: 100%;
  user-select: ${(props: StyleProps) => (props.interaction ? 'auto' : 'none')};
  pointer-events: ${(props: StyleProps) =>
    props.interaction ? 'auto' : 'none'};
`)<StyleProps>(compose(space, color, layout, flexbox, border, position));

export default MenuItemStyle;
