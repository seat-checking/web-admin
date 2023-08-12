import styled from 'styled-components';
import { ErrorMessage } from 'components/ErrorMessage';
import { Input } from 'components/Input';

export const InputWrap = styled.div`
  & + & {
    margin-top: 6.8rem;
  }
`;

export const DateInput = styled(Input)`
  width: fit-content;
  &:hover {
    cursor: text;
  }
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

export const BottomWrap = styled.div`
  margin-top: 6.8rem;
  margin-bottom: 9.8rem;
`;

export const GappedErrorMessage = styled(ErrorMessage)`
  margin-top: 0.8rem;
`;
