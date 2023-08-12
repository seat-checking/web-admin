import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { flexSet } from 'styles/mixin';

export const Background = styled.div`
  /* background-color: goldenrod; */
  height: 100%;

  ${flexSet()}
`;
export const ContentWrap = styled.div`
  /* background-color: yellow; */
  width: 53.9rem;
`;

export const InputWrap = styled.div`
  margin-top: 3.2rem;
`;

export const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 3.4rem;
  line-height: 4.1rem;
  color: ${({ theme }) => theme.palette.grey[500]};

  margin-bottom: 3.2rem;
`;

export const Checkbox = styled.input`
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  border: 2px solid red;
`;

export const JoinRow = styled.div`
  padding-top: 3.3rem;
  padding-bottom: 5.6rem;

  ${flexSet()}
`;

export const OrangeText = styled.span`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.9rem;
  color: ${({ theme }) => theme.palette.primary.orange};
`;

export const JoinLink = styled(Link)`
  margin-left: 2.1rem;

  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.1rem;
  color: ${({ theme }) => theme.palette.grey[500]};
`;
