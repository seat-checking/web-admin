import {
  Label,
  LabelText,
  StyledInput,
  Wrap,
  RequiredAsterisk,
} from 'components/Input.styled';

interface InputProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  label: string;
  placeholder: string;
  required?: boolean;
}

/**
 * 인풋 컴포넌트
 */
export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  required = true,
  ...rest
}) => {
  return (
    <Wrap {...rest}>
      <Label>
        <LabelText>
          {label}
          {required && <RequiredAsterisk>*</RequiredAsterisk>}
        </LabelText>
        <StyledInput placeholder={placeholder} />
      </Label>
    </Wrap>
  );
};
