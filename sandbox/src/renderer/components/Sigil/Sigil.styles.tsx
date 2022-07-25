import styled, { css } from 'styled-components';
import {
  compose,
  space,
  layout,
  flexbox,
  border,
  position,
  color,
  BorderProps,
} from 'styled-system';

export type SigilStyleProps = BorderProps & {
  clickable?: boolean;
  active?: boolean;
  sigilColor?: string;
  sigilSize?: number;
  borderRadiusOverride?: string;
  overlayBorder?: string;
  raised?: boolean;
  theme: any;
};

export const AvatarWrapper = styled(styled.div`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  text-align: center;
  vertical-align: middle;
  background: transparent;
  -webkit-box-sizing: content-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: content-box; /* Firefox, other Gecko */
  box-sizing: content-box; /* Opera/IE 8+ */
  overflow: visible;
  pointer-events: none;
  img {
    user-select: none;
    pointer-events: none;
    height: ${(props) => props.sigilSize}px;
    width: ${(props) => props.sigilSize}px;
  }
  transition: ${(props) => props.theme.transition};

  ${(props: SigilStyleProps) =>
    props.clickable &&
    css`
      cursor: pointer;
    `}
  ${(props: SigilStyleProps) =>
    props.raised &&
    css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `}
`)<SigilStyleProps>(compose(space, layout, flexbox, border, position, color));

export const SigilStyle = styled(
  styled.div`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    outline: none;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    text-align: center;
    vertical-align: middle;
    -webkit-box-sizing: content-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: content-box; /* Firefox, other Gecko */
    box-sizing: content-box; /* Opera/IE 8+ */
    overflow: visible;
    height: ${(props) => props.sigilSize}px;
    /* width: ${(props) => props.sigilSize}px; */

    background-color: ${(props) => props.sigilColor};
    border-width: 0px;
    border-radius: ${(props) => props.borderRadiusOverride || '4px'};
    transition: ${(props) => props.theme.transition};
    pointer-events: none;

    svg {
      pointer-events: ${(props) => (props.clickable ? 'none' : 'inherit')};
      rect {
        transition: ${(props) => props.theme.transition};
      }
    }

    ${(props: SigilStyleProps) =>
      props.clickable &&
      css`
        cursor: pointer;
      `}

    ${(props: SigilStyleProps) =>
      props.raised &&
      css`
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      `}
  `
)<SigilStyleProps>(compose(space, layout, flexbox, border, position, color));
