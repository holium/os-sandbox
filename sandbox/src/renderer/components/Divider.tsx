import styled from 'styled-components';
import { compose, space, SpaceProps } from 'styled-system';
import { rgba } from 'polished';
import { ThemeType } from 'renderer/theme';
import { motion } from 'framer-motion';

type IProps = {
  theme: ThemeType;
  customBg?: string;
} & SpaceProps;

export const Divider = styled(motion.div)<IProps>`
  display: inline-block;
  width: 2px;
  background-color: ${(props: IProps) =>
    props.customBg || rgba(props.theme.colors.bg.divider, 0.2)};
  margin: 0 16px;
  border-radius: 6px;
  height: 1.3em;
  ${compose(space)}
`;

Divider.defaultProps = {
  ml: 4,
  mr: 4,
};
