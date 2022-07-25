/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import { MenuWrapper } from './Menu.styles';

interface IProps {
  id: any;
  preventDefault?: boolean;
  style?: any;
  isOpen: boolean;
  clickableRef?: any;
  customBg?: string;
  children: any;
  onClose: (...args: any) => any;
}

interface IState {
  isOpen?: boolean;
}

//
// Docs:
//    button attribute to prevent close menu: data-prevent-menu-close
//
export class Menu extends React.PureComponent<IProps, IState> {
  menuRef: any;
  static defaultProps = {
    isOpen: false,
    id: Math.random(),
    preventDefault: true,
  };

  constructor(props: any) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = (event: any) => {
    const { isOpen, onClose, preventDefault } = this.props;

    const domNode = ReactDOM.findDOMNode(this.menuRef.current);
    if (!domNode || !domNode.contains(event.target)) {
      // You are clicking outside
      if (isOpen) {
        preventDefault && event.preventDefault();
        onClose();
      }
    } else {
      // You are clicking inside
      const clickedNode = ReactDOM.findDOMNode(event.target)!;
      const preventMenuClose = event.target.getAttribute(
        'data-prevent-menu-close'
      );
      if (clickedNode.nodeName === 'LI' || clickedNode.nodeName === 'BUTTON') {
        !preventMenuClose && onClose();
      }
    }
  };

  render() {
    const { customBg, children, style, isOpen, id } = this.props;
    return (
      <MenuWrapper
        id={id}
        customBg={customBg}
        ref={(node) => (this.menuRef.current = node)}
        style={{ display: isOpen ? 'flex' : 'none', ...style }}
        role="list"
      >
        {children}
      </MenuWrapper>
    );
  }
}
Menu.defaultProps = {
  isOpen: false,
  id: Math.random(),
  preventDefault: true,
};

export default Menu;
