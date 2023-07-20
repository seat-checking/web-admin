import styled from 'styled-components/macro';

export const Wrap = styled.div`
  padding: 2.5rem;
`;
export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-weight: 400;
  font-size: 2rem;
  line-height: normal;

  text-align: center;
`;
