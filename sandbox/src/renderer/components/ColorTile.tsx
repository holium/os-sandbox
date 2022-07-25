import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ColorTileProps {
  tileColor: string;
  size?: number;
}
export const ColorTile = styled(motion.div)<ColorTileProps>`
  background: ${(props: ColorTileProps) => props.tileColor};
  height: ${(props) => (props.size ? `${props.size}px` : '30px')};
  width: ${(props) => (props.size ? `${props.size}px` : '30px')};
  position: relative;
  outline: none;
  float: left;
  border-radius: 4px;
  margin: 0px 6px 0px 0px;
`;
interface ColorPopoverProps {
  isOpen: boolean;
  size?: number;
}
export const ColorTilePopover = styled(motion.div)<ColorPopoverProps>`
  position: absolute;
  z-index: 3;
  top: 40px;
  left: ${(props) =>
    props.size ? `-${Math.ceil(props.size / 3.5)}px` : '-6px'};
  width: 170px;

  display: ${(props: ColorPopoverProps) => (props.isOpen ? 'block' : 'none')};
`;
