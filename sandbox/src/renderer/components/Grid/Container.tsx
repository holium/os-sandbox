import styled, { css } from 'styled-components';
import { space, layout, SpaceProps, LayoutProps, compose } from 'styled-system';
import type { ThemeType } from '../../theme';

import config, { DIMENSIONS } from './helpers';

type ContainerType = SpaceProps &
  LayoutProps & {
    fluid?: boolean;
    scroll?: boolean;
    offset?: number; // if there is any top offset for nav
    children: React.ReactNode;
    debug?: boolean;
    theme: ThemeType;
  };

const Container = styled(styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 100vw;
  max-width: 100vw;
  height: ${(props: ContainerType) =>
    props.offset ? `calc(100% - ${props.offset}px)` : 'inherit'};
  box-sizing: border-box;
  overflow-y: ${(props: ContainerType) =>
    props.scroll ? 'scroll' : 'visible'};
  color: ${(props: ContainerType) => props.theme.colors.text.primary};

  ${(p) => css`
    ${DIMENSIONS.map(
      (d) =>
        config(p).container[d] &&
        config(p).media[d]`
      padding-left: ${config(p).paddingWidth[d]}rem;
      padding-right: ${config(p).paddingWidth[d]}rem;
    `
    )}
  `}

  ${(p) =>
    !p.fluid &&
    css`
      ${DIMENSIONS.map(
        (d) =>
          config(p).container[d] &&
          config(p).media[d]`
      ${
        typeof config(p).container[d] === 'number'
          ? `max-width: ${config(p).container[d]}rem;`
          : `width: 100%;`
      }
    `
      )}
    `}
  ${({ debug }) =>
    debug &&
    css`
      background-color: #5901ad40;
      outline: #fff solid 1px;
    `}
`)<ContainerType>(compose(space, layout));

Container.displayName = 'Container';

Container.defaultProps = {
  debug: false,
  scroll: false,
  offset: 0,
};

export default Container;
