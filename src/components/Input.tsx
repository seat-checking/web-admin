import { forwardRef } from 'react';
import type { Ref } from 'react';
import { StyledInput, Wrap } from 'components/Input.styled';
import { Label } from 'components/Label';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  required?: boolean; // false면 * 표시 숨김
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

/**
 * 인풋 컴포넌트
 */
export const Input = forwardRef(
  (
    {
      label,
      placeholder = '',
      required = true,
      type = 'text',
      ...rest
    }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      // TODO rest 처리
      <Wrap>
        <Label label={label} required={required}>
          <StyledInput
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
          />
        </Label>
      </Wrap>
    );
  },
);
