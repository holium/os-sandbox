import styled from 'styled-components';
import { Box, BoxProps } from './Box';

export type FlexProps = {
  gap?: string | number | undefined;
} & BoxProps;

export const Flex = styled(Box)<FlexProps>({
  // @ts-expect-error type issues
  gap: (props: any) => {
    if (!props.gap) {
      return 0;
    }
    return props.gap === typeof 'string' ? props.gap : `${props.gap}px`;
  },
});

Flex.defaultProps = {
  display: 'flex',
};

export default { Flex };
