import React, { FC } from 'react';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { lighten, rgba } from 'polished';
import { ThemeType } from '../theme';
import { number } from 'yup';

const Wrapper = styled(motion.div)<{ height: number; width: number }>`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

type BadgeStyleProps = {
  theme: ThemeType;
  minimal?: boolean;
  top: number;
  right: number;
};

const BadgeStyle = styled(motion.div)<BadgeStyleProps>`
  position: absolute;
  display: block;
  border-radius: 50%;

  ${(props: BadgeStyleProps) => css`
    background: ${lighten(0.02, props.theme.colors.brand.primary)};
    top: ${props.top}px;
    right: ${props.right}px;
    height: ${props.minimal ? '6px' : '12px'};
    width: ${props.minimal ? '6px' : '12px'};
  `}
`;

// const
type BadgeProps = {
  wrapperHeight: number;
  wrapperWidth: number;
  children: React.ReactNode;
  minimal?: boolean;
  count: number;
  top: number;
  right: number;
};

export const Badge: FC<BadgeProps> = (props: BadgeProps) => {
  const { minimal, top, right, count, wrapperHeight, wrapperWidth, children } =
    props;

  return (
    <Wrapper height={wrapperHeight} width={wrapperWidth}>
      {children}
      {count > 0 && (
        <BadgeStyle top={top} right={right} minimal={minimal}></BadgeStyle>
      )}
    </Wrapper>
  );
};
Badge.defaultProps = {
  top: 0,
  right: 0,
  count: 0,
};
