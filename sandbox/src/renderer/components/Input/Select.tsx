import { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { RadioOption, Text, Icons, InputWrapper } from '..';
import { ThemeType } from 'renderer/theme';
import MenuItemStyle from '../MenuItem/MenuItem.styles';
import ReactDOM from 'react-dom';

type SelectWrapperStyle = {
  customBg?: string;
  theme: ThemeType;
};

// const SelectItem = styled(MenuItemStyle)``;

const SelectDropdown = styled(motion.ul)<SelectWrapperStyle>`
  z-index: 20;
  top: 32px;
  right: 0px;
  padding: 4px;
  position: absolute;
  border-radius: 6px;
  gap: 2px;
  box-sizing: border-box;
  border: 1px solid
    ${(props: SelectWrapperStyle) => props.theme.colors.ui.borderColor};
  background-color: ${(props: SelectWrapperStyle) => props.customBg};
`;

interface ISelectInput {
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  customBg: string;
  textColor: string;
  iconColor: string;
  options: RadioOption[];
  selected?: string;
  onClick: (value: any) => void;
}

export const Select: FC<ISelectInput> = (props: ISelectInput) => {
  const {
    options,
    placeholder,
    selected,
    customBg,
    textColor,
    iconColor,
    disabled,
    onClick,
  } = props;
  const selectRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleClickOutside = (event: any) => {
    const domNode = ReactDOM.findDOMNode(selectRef.current);
    const dropdownNode = document.getElementById('select-dropdown');
    const isVisible = dropdownNode
      ? dropdownNode!.getAttribute('data-is-open') === 'true'
      : false; // get if the picker is visible currently
    if (!domNode || !domNode.contains(event.target)) {
      if ('select-input' === event.target.id) {
        return;
      }
      // You are clicking outside
      if (isVisible) {
        setOpen(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const showMenu = {
    enter: {
      opacity: 1,
      y: 0,
      display: 'block',
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      y: -5,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  const selectedOption = options.find(
    (option: RadioOption) => option.value === selected
  );

  return (
    <InputWrapper
      id="select-input"
      disabled={disabled}
      shouldHighlightOnFocus={false}
      minHeight={30}
      hasPointerEvents
      position="relative"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={8}
      onClick={() => !disabled && (open ? setOpen(false) : setOpen(true))}
    >
      {selected ? (
        <Text fontSize={2} color={textColor}>
          {selectedOption?.label}
        </Text>
      ) : (
        <Text opacity={0.5} fontSize={2} color={textColor}>
          {placeholder}
        </Text>
      )}
      <Icons fill={iconColor} name="ArrowDown" />
      <SelectDropdown
        id="select-dropdown"
        variants={showMenu}
        initial="exit"
        animate={open ? 'enter' : 'exit'}
      >
        {options
          .filter((option: RadioOption) => !option.hidden)
          .map((option: RadioOption) => {
            return (
              <MenuItemStyle
                customBg={customBg}
                color={textColor}
                fontSize={2}
                pt={2}
                pb={2}
                disabled={selected === option.value}
                key={option.value}
                onClick={() => {
                  !disabled && onClick(option.value);
                }}
              >
                {option.label}
              </MenuItemStyle>
            );
          })}
      </SelectDropdown>
    </InputWrapper>
  );
};

Select.defaultProps = {
  placeholder: 'Select one',
};
