import { motion } from 'framer-motion';
import styled from 'styled-components';

export const DragHandleWrapper = styled(motion.div)`
  position: absolute;
  height: 6px;
  left: -4px;
  right: -4px;
  bottom: -2px;
`;

export const LeftDragHandleStyle = styled(motion.div)`
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 8px;
  width: 8px;
  cursor: sw-resize;
`;

export const RightDragHandleStyle = styled(motion.div)`
  position: absolute;
  right: 0px;
  bottom: 0px;
  height: 8px;
  width: 8px;
  cursor: se-resize;
`;
