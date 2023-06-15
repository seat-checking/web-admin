import styled, { css } from 'styled-components';

export const StyledButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 5.6rem;

  background-color: ${({ theme }) => theme.palette.primary.orange};
  color: white;
  border-radius: 0.8rem;

  font-weight: 500;
  font-size: 2rem;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.palette.grey[400]};
      background-color: ${theme.palette.grey[100]};
      cursor: default;
    `}
`;
