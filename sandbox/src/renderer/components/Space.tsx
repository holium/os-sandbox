/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

const classnames = (...args: any[]) => args.join(' ');
const getClassName = (el: any) => (el.props && el.props.className) || '';

// eslint-disable-next-line react/require-default-props
export const StyledChildren: React.FC<{ className?: string } & SpaceProps> = ({
  className,
  children,
}) => {
  const styledChildren = React.Children.toArray(children).map((child: any) =>
    React.cloneElement(child, {
      className: classnames(getClassName(child), className),
    })
  );
  return <>{styledChildren}</>;
};

export const Space = styled(StyledChildren)(space);
