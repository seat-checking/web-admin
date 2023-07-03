import styled from 'styled-components/macro';

export const Wrap = styled.div``;

export const StyledInput = styled.input`
  padding: 0 1.6rem;

  width: 100%;
  height: 4.8rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 0.8rem;

  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;

  // 인풋창 테두리
  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.palette.primary.orange};
    outline-offset: -0.2rem;
  }
`;
