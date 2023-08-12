import { forwardRef } from 'react';

import type { Ref } from 'react';
import type React from 'react';
import { Input, InputCheckBoxWrapper } from 'components/InputCheckBox.styled';

type InputCheckBoxProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputCheckBox: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputCheckBoxProps
> = ({ ...others }: InputCheckBoxProps, ref: Ref<HTMLInputElement>) => {
  return (
    <InputCheckBoxWrapper>
      <Input type='checkbox' ref={ref} {...others} />
    </InputCheckBoxWrapper>
  );
};

export default forwardRef(InputCheckBox);
