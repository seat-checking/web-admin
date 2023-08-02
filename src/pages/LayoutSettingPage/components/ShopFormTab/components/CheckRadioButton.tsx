import { forwardRef } from 'react';
import styled from 'styled-components';
import type { Ref } from 'react';

import checkIcon from 'assets/icons/check.svg';
import checkedIcon from 'assets/icons/checked.svg';

interface RadioProps extends React.ComponentPropsWithRef<'input'> {
  id?: string;
  name: string; // radio group 내에서 동일한 이름 사용해야함
  value: string;
}

/**
 * radio 컴포넌트, check box 디자인 (가게 형태 탭에서 사용)
 */
export const CheckRadioButton = forwardRef(
  ({ id, name, value, ...rest }: RadioProps, ref: Ref<HTMLInputElement>) => {
    return (
      <>
        <RadioInput
          type='radio'
          name={name}
          value={value}
          ref={ref}
          {...rest}
          {...{ id }}
        />
        <div className='radioBtnIcon'>라디오 버튼</div>
      </>
    );
  },
);

const RadioInput = styled.input`
  &[type='radio'] {
    display: none;

    & + .radioBtnIcon {
      width: 3.2rem;
      height: 3.2rem;
      font-size: 0;
      background: url(${checkIcon});
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }

  &[type='radio']:checked {
    width: 2.4rem;
    height: 2.4rem;
    outline: 0.3rem solid ${({ theme }) => theme.palette.primary.orange};
    border: 0.3rem solid white;
    background-color: ${({ theme }) => theme.palette.primary.orange};
    margin: 0.3rem;

    & + .radioBtnIcon {
      width: 3.2rem;
      height: 3.2rem;
      background: url(${checkedIcon});
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }
`;
