import { FC } from 'react';
import { rgba, darken } from 'polished';

import { Flex, RadioOption, Text, Icons } from '..';
import { Row } from '../NewRow';

interface IRadioList {
  customBg: string;
  textColor: string;
  options: RadioOption[];
  selected?: string;
  onClick: (value: any) => void;
}

export const RadioList: FC<IRadioList> = (props: IRadioList) => {
  const { options, selected, customBg, textColor, onClick } = props;
  const optionBg = darken(0.025, customBg);

  return (
    <Flex flexDirection="column" gap={8}>
      {options?.map((option: RadioOption) => {
        const isSelected = option.value === selected;
        return (
          <Row
            key={option.value}
            gap={12}
            selected={isSelected}
            customBg={optionBg}
            onClick={() => onClick(option.value)}
          >
            {option.icon && (
              <Flex alignItems="center" justifyContent="center">
                <Icons
                  opacity={isSelected ? 1 : 0.6}
                  size={24}
                  name={option.icon}
                  fill={isSelected ? '#4E9EFD' : textColor}
                />
              </Flex>
            )}
            <Flex flexDirection="column">
              <Text
                fontSize={2}
                fontWeight={500}
                color={isSelected ? 'brand.primary' : textColor}
              >
                {option.label}
              </Text>
              {option.sublabel && (
                <Text
                  fontSize={2}
                  color={textColor}
                  opacity={isSelected ? 0.4 : 0.6}
                >
                  {option.sublabel}
                </Text>
              )}
            </Flex>
          </Row>
        );
      })}
    </Flex>
  );
};
