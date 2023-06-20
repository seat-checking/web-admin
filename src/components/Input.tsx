import { forwardRef } from 'react';
import type { Ref } from 'react';
import {
  Label,
  LabelText,
  StyledInput,
  Wrap,
  RequiredAsterisk,
} from 'components/Input.styled';

interface InputProps
  extends React.HtmlHTMLAttributes<HTMLDivElement & HTMLInputElement> {
  label: string;
  placeholder: string;
  required?: boolean; // false면 * 표시 숨김
}

/**
 * 인풋 컴포넌트
 */
export const Input = forwardRef(
  (
    { label, placeholder, required = true, ...rest }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      // TODO rest 처리
      <Wrap>
        <Label>
          <LabelText>
            {label}
            {required && <RequiredAsterisk>*</RequiredAsterisk>}
          </LabelText>
          <StyledInput placeholder={placeholder} ref={ref} {...rest} />
        </Label>
      </Wrap>
    );
  },
);
