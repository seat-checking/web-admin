import styled from 'styled-components';
import { Input } from 'components/Input';

export const GappedInput = styled(Input)`
  & + & {
    margin-top: 6.8rem;
  }
`;

export const BottomWrap = styled.div`
  margin-top: 6.8rem;
  margin-bottom: 9.8rem;
`;
