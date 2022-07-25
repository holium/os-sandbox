import { FC, forwardRef } from 'react';
import styled, { StyledComponentProps } from 'styled-components';
import { TypographyFunctionsProps } from '../typography-functions';
import { Text } from '../Text';
import { Box } from '../Box';
import { ThemeType } from '../../theme';

type StyledLabelProps = {
  /** Apply the mandatory adornment */
  required?: boolean;
  bold?: boolean;
  /** A custom adornment to apply */
  adornment?: 'required' | string | JSX.Element;
  /** HTML element to render */
  as?: 'label' | 'legend';
  children: React.ReactNode | string;
  theme: ThemeType;
} & TypographyFunctionsProps;

const StyledLabel = styled(Text)`
  display: flex;
  width: 100%;
  align-items: center;
  color: ${(props) => props.theme.colors.text.primary};
  ${(props: StyledLabelProps) =>
    props.required &&
    `&:after {
      content: "*";
      margin-left: 3px;
      color: ${props.theme.colors.brand.secondary};
    }`};
`;

StyledLabel.defaultProps = {
  pl: 0,
  pr: 0,
};

export type LabelProps = StyledComponentProps<
  'label',
  any,
  StyledLabelProps,
  never
>;

export const Label: FC<LabelProps> = forwardRef<HTMLLabelElement, LabelProps>(
  (props: LabelProps, ref) => {
    // eslint-disable-next-line react/prop-types
    const { adornment, children, as } = props;
    return (
      <StyledLabel as={as} variant="label" ref={ref} {...props}>
        {children}
        {adornment && (
          <Box
            display="inline-flex"
            alignItems="center"
            color="text.placeholder"
            ml={2}
            fontWeight={400}
          >
            {adornment}
          </Box>
        )}
      </StyledLabel>
    );
  }
);

Label.defaultProps = {
  required: false,
  as: 'label',
};
