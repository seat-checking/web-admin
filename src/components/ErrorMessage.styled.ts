import styled from 'styled-components';

export const Wrap = styled.div<{ width: string; height: string }>`
  display: flex;
  align-items: center;
  padding-left: 1.6rem;

  width: ${({ width }) => width};
  height: ${({ height }) => height};

  background-color: #ffd9d9;
  border-radius: 0.8rem;
`;

export const Text = styled.span`
  margin-left: 0.4rem;

  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;

  color: ${({ theme }) => theme.palette.grey[500]};
`;
