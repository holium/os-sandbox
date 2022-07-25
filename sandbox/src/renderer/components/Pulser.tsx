//

import { FC } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { rgba } from 'polished';

const PulseStyle = styled(motion.div)<{ background: string }>`
  display: block;
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
  border-radius: 1.25rem;
  animation: pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: ${(props: any) => rgba(props.background, 0.4)};
`;

type PulserProps = {
  style?: any;
  background: string;
  width: number | 'inherit';
  height: number | 'inherit';
  borderRadius: number;
};

export const Pulser: FC<PulserProps> = (props: PulserProps) => {
  const { style, background, width, height, borderRadius } = props;
  return (
    <PulseStyle
      background={background}
      style={{ width, height, borderRadius, ...style }}
    />
  );
};

Pulser.defaultProps = {
  width: 'inherit',
  height: 'inherit',
};
