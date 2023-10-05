import styled from 'styled-components/macro';

export const Wrap = styled.div``;

export const ContentWrap = styled.div`
  padding: 2.4rem 3.4rem;
`;

export const EmptyBox = styled.div`
  width: 100%;
  padding: 3.1rem 0;

  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 0.8rem;

  background-color: white;

  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.grey[500]};
  text-align: center;
`;
