import { useEffect, useCallback, useState } from 'react';
import { MenuOrientation } from './types';

export const calculateAnchorPoint = (
  event: any,
  orientation: MenuOrientation,
  padding = 12,
  menuWidth: number,
  position?: 'above' | 'below'
) => {
  let x: number;
  // TODO cleanup
  // console.log(event, orientation);
  // console.log('offset left', event.srcElement.offsetLeft);
  // console.log('client Width', event.srcElement.clientWidth);

  switch (orientation) {
    case 'right':
      return {
        x: event.srcElement.offsetLeft + event.srcElement.clientWidth + padding,
        y: event.srcElement.offsetTop,
      };
    case 'left':
      x = event.srcElement.offsetLeft - event.srcElement.clientWidth + padding;
      if (menuWidth) {
        x = x - menuWidth;
      }
      return {
        x,
        y: event.srcElement.offsetTop,
      };
    case 'bottom-left':
      // [ offset left
      x = event.srcElement.offsetLeft + event.srcElement.clientWidth - padding;
      if (menuWidth) {
        x = x - menuWidth;
      }
      return {
        x,
        y: event.srcElement.offsetTop + event.srcElement.clientHeight - padding,
      };
    case 'bottom-right':
      x = event.srcElement.offsetLeft - event.srcElement.clientWidth;
      if (menuWidth) {
        x = x - menuWidth;
      }
      return {
        x,
        y: event.srcElement.offsetTop + event.srcElement.clientHeight + padding,
      };
    case 'top':
      return {
        x: event.srcElement.offsetLeft,
        y: event.srcElement.offsetTop - event.srcElement.clientHeight + padding,
      };

    case 'top-left':
      x = event.srcElement.offsetLeft + event.srcElement.clientWidth;
      if (menuWidth) {
        x = x - menuWidth;
      }
      return {
        x,
        y: event.srcElement.offsetTop - event.srcElement.clientHeight + padding,
      };
    case 'bottom':
      return {
        x: event.srcElement.offsetLeft,
        y: event.srcElement.offsetTop + event.srcElement.clientHeight + padding,
      };

    default:
      // pointer or default
      console.log(position);
      let y = event.layerY + padding;
      if (position === 'above') {
        y = event.srcElement.clientHeight;
      }
      return { x: event.layerX + padding, y: event.layerY + padding };
  }
};

export const useMenu = (
  ref: any,
  config: { orientation: MenuOrientation; padding: number; menuWidth?: any }
) => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMenu = useCallback(
    (event) => {
      // If the id of the menu matches the parent of the click, show the menu
      if (event.target.id === ref.current.id && !show) {
        event.preventDefault();
        event.currentTarget.blur(); // this is to lose focus after clicking.
        event.stopPropagation();
        setAnchorPoint(
          calculateAnchorPoint(
            event,
            config.orientation,
            config.padding,
            config.menuWidth || 250
          )
        );
        setShow(true);
      } else {
        event.preventDefault();
        event.stopPropagation();
        // setShow(false);
      }
    },
    [setShow, setAnchorPoint]
  );

  useEffect(() => {
    ref.current && ref.current.addEventListener('click', handleMenu);
    return () => {
      ref.current && ref.current.removeEventListener('click', handleMenu);
    };
  });

  return { anchorPoint, show, setShow };
};

export default useMenu;
