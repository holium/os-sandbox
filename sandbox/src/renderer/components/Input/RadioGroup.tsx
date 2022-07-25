import { FC } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { rgba, darken } from 'polished';
import { IconTypes, Flex } from '..';
import { ThemeType } from 'renderer/theme';

interface IRadioLabel {
  selected?: boolean;
  accentColor?: string;
  textColor?: string;
  customBg: string;
  theme: ThemeType;
}

const RadioLabel = styled(motion.label)<IRadioLabel>`
  /* padding: 8px; */
  height: 26px;
  z-index: 14;
  font-size: 14px;
  position: relative;
  font-weight: 500;
  ${(props: IRadioLabel) =>
    props.selected
      ? css`
          color: ${props.theme.colors.brand.primary};
          /* background-color: ${rgba(
            props.theme.colors.brand.primary,
            0.12
          )}; */
        `
      : css`
          color: ${props.textColor};
          background-color: ${darken(0.015, props.customBg)};
        `}
`;

const RadioHighlight = styled(motion.label)<IRadioLabel>`
  /* padding: 2px 4px; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 13;
  /* padding: 4px; */
  border-radius: 4px;
  position: absolute;
  ${(props: IRadioLabel) =>
    props.selected
      ? css`
          background-color: ${rgba(props.theme.colors.brand.primary, 0.12)};
        `
      : css`
          background-color: ${darken(0.015, props.customBg)};
        `}
`;

export type RadioOption = {
  label: string;
  value: string;
  sublabel?: string;
  icon?: IconTypes;
  hidden?: boolean;
};

interface IRadioGroup {
  customBg: string;
  textColor: string;
  options: RadioOption[];
  selected?: string;
  onClick: (value: any) => void;
}

export const RadioGroup: FC<IRadioGroup> = (props: IRadioGroup) => {
  const { options, selected, customBg, textColor, onClick } = props;
  const optionBg = darken(0.025, customBg);
  // TODO get the select transition working with framer
  return (
    <Flex
      p={1}
      flexDirection="row"
      width="fit-content"
      justifyContent="flex-start"
      backgroundColor={optionBg}
      gap={6}
      borderRadius={6}
    >
      {options?.map((option: RadioOption) => {
        const isSelected = option.value === selected;
        return (
          <motion.div
            key={option.value}
            style={{ position: 'relative', padding: '4px 4px' }}
          >
            {isSelected && (
              <RadioHighlight
                // layoutId="selection"
                customBg={optionBg}
                selected
              />
            )}
            <RadioLabel
              customBg={optionBg}
              textColor={textColor}
              selected={option.value === selected}
              onClick={(_evt: any) => onClick(option.value)}
            >
              {option.label}
            </RadioLabel>
          </motion.div>
        );
      })}
    </Flex>
  );
};

RadioGroup.defaultProps = {
  options: [],
};
