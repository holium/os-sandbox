import { useEffect, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { calculateAnchorPoint } from '../../logic/lib/anchor-point';

const useContextMenu = (
  containerId: string,
  ref: any,
  menuRef: any,
  height: number,
  position?: any
) => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      // If the id of the context menu matches the parent of the click, show the context menu
      if (event.target.id === containerId) {
        // console.log('context click');
        event.preventDefault();
        event.stopPropagation();

        setAnchorPoint(
          calculateAnchorPoint(
            event,
            'pointer',
            2,
            event.target.clientWidth,
            height,
            position
          )
        );
        setShow(true);
      } else {
        setShow(false);
      }
    },
    [setShow, setAnchorPoint]
  );

  // Closes the menu on menuItem click
  const handleClick = useCallback(
    (evt: any) => {
      if (show) {
        const preventMenuClose = evt.target.getAttribute(
          'data-prevent-context-close'
        );
        !preventMenuClose && setShow(false);
      }
    },
    [show]
  );

  const handleClickOutside = (event: any) => {
    const domNode = ReactDOM.findDOMNode(menuRef.current);
    if (!domNode || !domNode.contains(event.target)) {
      // Check if you arent clicking outside on the button that opens this:
      // clickableRef && event.target.id === clickableRef.current.id;
      if (show) {
        event.preventDefault();
        setShow(false);
      }
    }
  };
  useEffect(() => {
    ref.current.addEventListener('click', handleClick);
    ref.current.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('contextmenu', handleClickOutside, true);
    return () => {
      ref.current && ref.current.removeEventListener('click', handleClick);
      ref.current &&
        ref.current.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('contextmenu', handleClickOutside, true);
    };
  });

  return { anchorPoint, show, setShow };
};

export default useContextMenu;
