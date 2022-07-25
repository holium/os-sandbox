import styled, { css } from 'styled-components';

interface ISkeleton {
  height: number;
  width?: number;
  borderRadius?: number;
}

export const Skeleton = styled.div<ISkeleton>`
  ${(props: ISkeleton) =>
    css`
      height: ${props.height}px;
      width: ${props.width ? `${props.width}px` : '100%'}px;
      border-radius: ${props.borderRadius || 4}px;
    `}
  display: block;
  animation: skeleton-loading 1s linear infinite alternate;

  @keyframes skeleton-loading {
    0% {
      background-color: #78787806;
    }
    100% {
      background-color: #6b6b6b14;
    }
  }
  @keyframes shine {
    to {
      background-position: 100% 0;
    }
  }
`;
