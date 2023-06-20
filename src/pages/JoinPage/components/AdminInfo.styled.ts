import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ErrorMessage } from 'components/ErrorMessage';
import { flexSet } from 'styles/mixin';

export const Form = styled.form``;

export const InputWrap = styled.div`
  & + & {
    margin-top: 6.8rem;
  }
`;

export const GappedErrorMessage = styled(ErrorMessage)`
  margin-top: 0.8rem;
`;

export const LoginRow = styled.div`
  padding-top: 1.6rem;

  ${flexSet()}
`;

export const Description = styled.span`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.9rem;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const LoginLink = styled(Link)`
  margin-left: 2.1rem;

  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.1rem;
  color: ${({ theme }) => theme.palette.primary.orange};
`;

export const BottomWrap = styled.div`
  margin-top: 6.8rem;
  margin-bottom: 9.8rem;
`;
