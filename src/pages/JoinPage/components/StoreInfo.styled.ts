import styled from 'styled-components/macro';
import { ErrorMessage } from 'components/ErrorMessage';

export const InputWrap = styled.div`
  & + & {
    margin-top: 6.8rem;
  }
`;

export const BottomWrap = styled.div`
  margin-top: 6.8rem;
  margin-bottom: 9.8rem;
`;

export const GappedErrorMessage = styled(ErrorMessage)`
  margin-top: 0.8rem;
`;
