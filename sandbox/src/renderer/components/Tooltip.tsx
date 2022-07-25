/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { compose, space, color, typography } from 'styled-system';
import { Card, Box, MenuOrientation } from '.';
import { Portal } from 'renderer/system/Portal';

// type Placement =
//   | 'bottom-right'
//   | 'bottom-left'
//   | 'bottom'
//   | 'left'
//   | 'right'
//   | 'top-right'
//   | 'top-left'
//   | 'top';

export type TooltipProps = {
  id: string;
  delay?: number; // 0.5
  style?: any;
  placement: MenuOrientation;
  content?: React.ReactNode | string;
  children: React.ReactNode;
  position?: any;
};

const margin = 2;

const placementMaps = {
  bottom: css`
    margin-top: ${margin}px;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
  `,
  'bottom-right': css`
    top: 100%;
    left: 100%;
  `,
  'bottom-left': css`
    top: 100%;
    right: 100%;
  `,
  top: css`
    margin-bottom: ${margin}px;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 0);
  `,
  'top-right': css`
    bottom: 100%;
    left: 100%;
  `,
  'top-left': css`
    bottom: 100%;
    right: 100%;
  `,
  left: css`
    margin-right: ${margin}px;
    bottom: 50%;
    right: 100%;
    transform: translate(0, 50%);
  `,
  right: css`
    margin-left: ${margin}px;
    bottom: 50%;
    left: 100%;
    transform: translate(0, 50%);
  `,
};

type TooltipStyleProps = { placement: MenuOrientation };
// Tooltip
export const TooltipStyle = styled(
  styled.div<TooltipStyleProps>`
    // position: absolute;
    display: inline-flex;
    flex-direction: column;
    width: max-content;
    height: max-content;
    overflow: visible;
    color: ${(props) => props.theme.colors.text.primary};
    box-shadow: ${(props) => props.theme.elevations.one};
    ${(
      props: TooltipStyleProps // @ts-expect-error types
    ) => placementMaps[props.placement]};
  `
)(compose(space, color, typography));

const Wrapper = styled(motion.div)<{ coords: any }>`
  ${({ coords }) => css`
    left: ${coords.left}px;
    top: ${coords.top}px;
  `}
  box-sizing: border-box;
  position: absolute;
`;
// // Parent wrapper
export const TooltipWrapper = styled(styled.div<Partial<TooltipProps>>`
  position: relative;
  z-index: 4;

  ${TooltipStyle} {
    transition: 0.2s all;
    visibility: hidden;
  }
  &:hover {
    ${TooltipStyle} {
      transition-delay: ${(props: Partial<TooltipProps>) => props.delay}s;
      visibility: visible;
    }
  }
`)(compose(space, color, typography));

const baseMotionProps = {
  variants: {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 1,
        ease: 'easeOut',
      },
    },
    inactive: {
      opacity: 0,
      y: 4,
      transition: {
        duration: 0.2,
      },
    },
  },
  initial: 'inactive',
  animate: 'active',
  exit: 'inactive',
};

export const Tooltip = (props: TooltipProps) => {
  // const domNode = document.createElement('div');
  const { id, style, content, delay, placement, children } = props;
  const tooltipRef = React.useRef(null);
  const [coords, setCoords] = React.useState({ left: 0, top: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  let body = content;

  if (typeof content === 'string') {
    body = (
      <Card borderRadius={4} style={{ fontSize: 14 }} padding="4px">
        {content}
      </Card>
    );
  }
  return (
    <TooltipWrapper ref={tooltipRef} style={style}>
      <Portal>
        {isVisible && (
          <AnimatePresence>
            <Wrapper
              key={`${id}-tooltip`}
              coords={coords}
              {...props}
              {...baseMotionProps}
            >
              <TooltipStyle
                style={{ left: coords.left, top: coords.top }}
                placement={placement}
              >
                {body}
              </TooltipStyle>
            </Wrapper>
          </AnimatePresence>
        )}
      </Portal>
      <Box
        // onClick={() => {
        //   setIsVisible(false);
        // }}
        onMouseDown={(evt: any) => {
          setIsVisible(false);
          evt.stopPropagation();
        }}
        onMouseEnter={(evt: any) => {
          const rect = evt.target.getBoundingClientRect();
          setCoords({
            left: rect.x,
            top: rect.top - rect.height,
          });
          evt.stopPropagation();
          setIsVisible(true);
        }}
        onMouseLeave={(evt: any) => {
          // evt.stopPropagation();
          setIsVisible(false);
        }}
      >
        {children}
      </Box>
    </TooltipWrapper>
  );
};

Tooltip.defaultProps = {
  placement: 'bottom-right',
  delay: 0.5,
};

// import {
//   createContext,
//   forwardRef,
//   useContext,
//   useEffect,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { createPortal } from 'react-dom';
// import styled, { css } from 'styled-components';

// const TooltipContext = createContext({
//   activeTooltip: null,
//   updateActiveTooltip: () => {},
// });

// export const TooltipProvider = ({ children }) => {
//   const [activeTooltip, updateActiveTooltip] = useState(null);
//   useLayoutEffect(() => {
//     const removeOutsideClickHandler = () => {
//       document.removeEventListener('click', outsideClickListener);
//     };
//     const outsideClickListener = ({ target }) => {
//       if (target.attributes?.role?.nodeValue !== 'tooltip' && activeTooltip) {
//         updateActiveTooltip(null);
//       }
//     };
//     document.addEventListener('click', outsideClickListener);

//     return () => {
//       removeOutsideClickHandler();
//     };
//   }, [activeTooltip]);

//   return (
//     <TooltipContext.Provider value={{ activeTooltip, updateActiveTooltip }}>
//       {children}
//     </TooltipContext.Provider>
//   );
// };
// export const TooltipConsumer = TooltipContext.Consumer;

// const TooltipMarkerButton = styled.button`
//   background: grey;
//   border-radius: 50%;
//   border: 2px solid white;
//   box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
//   color: white;
//   font-weight: 900;
//   width: 25px;
//   height: 25px;
//   text-align: center;
//   display: inline-block;
//   cursor: pointer;
//   outline: 0;
//   &:hover {
//     background: white;
//     color: grey;
//   }
// `;

// export const TooltipMarker = forwardRef(({ id, ...props }, ref) => {
//   return (
//     <TooltipConsumer>
//       {({ updateActiveTooltip }) => (
//         <TooltipMarkerButton
//           id={id}
//           ref={ref}
//           {...props}
//           onClick={() => updateActiveTooltip(id)}
//         >
//           ?
//         </TooltipMarkerButton>
//       )}
//     </TooltipConsumer>
//   );
// });

// const TooltipPointer = styled.div`
//   width: 0;
//   height: 0;
//   border-left: 10px solid transparent;
//   border-right: 10px solid transparent;
//   position: absolute;
//   ${({ left, bottom, top }) => css`
//     bottom: ${bottom || 'auto'};
//     top: ${top || 'auto'};
//     left: ${left};
//     border-bottom: ${top ? '15px solid #dedede' : undefined};
//     border-top: ${bottom ? '15px solid #dedede' : undefined};
//   `}
// `;

// const Wrapper = styled(motion.div)`
//   ${({ position }) => css`
//     left: ${position[0]}px;
//     top: ${position[1]}px;
//   `}
//   box-sizing: border-box;
//   max-width: 20rem;
//   padding: 1rem;
//   border-radius: 1rem;
//   background: #dedede;
//   position: absolute;
//   /* box-shadow: 3px -3px 3px 0 rgba(0, 0, 0, 0.3); */
// `;

// const slideDownVariants = {
//   active: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.4,
//       ease: 'easeOut',
//     },
//   },
//   inactive: {
//     opacity: 0,
//     y: -40,
//     transition: {
//       duration: 0.3,
//     },
//   },
// };

// const slideUpVariants = {
//   ...slideDownVariants,
//   inactive: {
//     opacity: 0,
//     y: 40,
//     transition: {
//       duration: 0.3,
//     },
//   },
// };

// const baseMotionProps = {
//   variants: slideDownVariants,
//   initial: 'inactive',
//   animate: 'active',
//   exit: 'inactive',
// };

// export const Tooltip = ({ target, children, ...props }) => {
//   const { activeTooltip } = useContext(TooltipContext);
//   const ref = useRef(null);
//   const [position, setPosition] = useState([0, 0]);
//   const [motionProps, setMotionProps] = useState(baseMotionProps);
//   const [pointerPosition, setPointerPosition] = useState({
//     left: '4%',
//     bottom: '-13px',
//   });
//   const active = activeTooltip === target;

//   useEffect(() => {
//     if (!active) return;

//     const updatePosition = () => {
//       const marker = document.getElementById(target)!.getBoundingClientRect();
//       const appearLeft = marker.left > window.innerWidth * 0.8;
//       const appearAbove = marker.top > ref.current!.clientHeight * 1.2;
//       const pointerPositionTop = appearAbove
//         ? { bottom: '-13px' }
//         : { top: '-13px' };
//       setPointerPosition({
//         left: appearLeft ? '90%' : '5%',
//         ...pointerPositionTop,
//       });
//       setPosition([
//         appearLeft
//           ? marker.left +
//             window.scrollX -
//             ref.current.clientWidth +
//             marker.width * 1.5
//           : marker.left + window.scrollX - marker.width / 2,
//         appearAbove
//           ? marker.top +
//             window.scrollY -
//             ref.current.clientHeight -
//             marker.height / 2
//           : marker.top + window.scrollY + marker.height * 1.5,
//       ]);
//       setMotionProps(
//         appearAbove
//           ? { ...baseMotionProps, ...{ variants: slideDownVariants } }
//           : { ...baseMotionProps, ...{ variants: slideUpVariants } }
//       );
//     };

//     updatePosition();
//     window.addEventListener('resize', updatePosition);

//     return () => {
//       window.removeEventListener('resize', updatePosition);
//     };
//   }, [active, target]);

//   const Component = (
//     <AnimatePresence>
//       {active && (
//         <Wrapper
// key={`${target}-tooltip`}
// ref={ref}
// position={position}
// {...props}
// {...motionProps}
//         >
//           <TooltipPointer {...pointerPosition} />
//           {children}
//         </Wrapper>
//       )}
//     </AnimatePresence>
//   );
//   return createPortal(Component, document.getElementById('portal-root'));
// };
