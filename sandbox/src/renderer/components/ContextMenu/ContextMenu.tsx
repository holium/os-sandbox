import React from 'react';
import useContextMenu from './useContextMenu';
import useSystemContextMenu from './useSystemContextMenu';
import { MenuItem } from '../MenuItem';
import { MenuWrapper } from '../Menu';
import { rgba } from 'polished';
import Portal from 'renderer/system/Portal';

export type ContextMenuProps = {
  isComponentContext?: boolean;
  position?: 'above' | 'below';
  style?: any;
  textColor: string;
  containerId: string;
  parentRef: any;
  customBg?: string;
  menuItemtype?: 'neutral' | 'brand';
  menu: any[];
};

export const ContextMenu = (props: ContextMenuProps) => {
  const {
    position,
    containerId,
    parentRef,
    style,
    menu,
    menuItemtype,
    customBg,
    textColor,
    isComponentContext,
  } = props;
  const contextMenuRef = React.useRef();
  let anchorPoint;
  let show;
  if (isComponentContext) {
    const context = useContextMenu(
      containerId,
      parentRef,
      contextMenuRef,
      (menu.length + 1) * 32 + 16, // the padding plus each element,
      position
    );
    anchorPoint = context.anchorPoint;
    show = context.show;
  } else {
    const systemContext = useSystemContextMenu();
    anchorPoint = systemContext.anchorPoint;
    show = systemContext.show;
  }

  const sectionsArray = menu.reduce((arr, obj: any, index: number) => {
    if (!index || arr[arr.length - 1][0].section !== obj.section) {
      return arr.concat([
        [
          <MenuItem
            id={obj.id}
            color={obj.disabled ? rgba(textColor, 0.7) : textColor}
            customBg={customBg}
            type={menuItemtype}
            key={index}
            {...obj}
          />,
        ],
      ]);
    }
    arr[arr.length - 1].push(
      <MenuItem
        id={obj.id}
        color={obj.disabled ? rgba(textColor, 0.7) : textColor}
        customBg={customBg}
        type={menuItemtype}
        key={index}
        {...obj}
      />
    );
    return arr;
  }, []);

  // if (show) {
  return (
    <Portal>
      <MenuWrapper
        key={containerId}
        id={`${containerId}-context-menu`}
        className="menu"
        customBg={customBg}
        initial={{
          opacity: 0,
          // y: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.1,
          },
        }}
        exit={{
          opacity: 0,
          // y: 8,
          transition: {
            duration: 0.1,
          },
        }}
        // @ts-ignore
        ref={contextMenuRef}
        style={{
          y: anchorPoint.y,
          x: anchorPoint.x,
          display: show ? 'block' : 'none',
          ...style,
        }}
      >
        {sectionsArray.map((menuSection: any[], index: number) => {
          let divider = <hr />;
          if (index === sectionsArray.length - 1) {
            // @ts-ignore
            divider = undefined;
          }
          return (
            <section key={`section-${index}`}>
              {menuSection}
              {divider}
            </section>
          );
        })}
      </MenuWrapper>
    </Portal>
  );
  // }
  // return <></>;
};

ContextMenu.defaultProps = {
  menuItemtype: 'neutral',
  position: 'below',
};

export default ContextMenu;
// With animation test
// <Spring
//   config={{ duration: 10 }}
//   from={{ opacity: 0, x: anchorPoint.x + 10, y: anchorPoint.y + 10 }}
//   to={{ opacity: 1, x: anchorPoint.x, y: anchorPoint.y }}
// >
//   {(springProps: any) => (
//     <ContextMenuStyles
//       id={`${containerId}-context-menu`}
//       className="menu"
//       ref={contextMenuRef}
//       style={{ top: springProps.y, left: springProps.x }}
//     >
//       {sectionsArray.map((menuSection: any[], index: number) => {
//         let divider = <hr />;
//         if (index === sectionsArray.length - 1) {
//           divider = undefined;
//         }
//         return (
//           <div key={`section-${index}`}>
//             {menuSection}
//             {divider}
//           </div>
//         );
//       })}
//     </ContextMenuStyles>
//   )}
// </Spring>;
