import styled, { css } from 'styled-components';

export const StyledButton = styled.button<{
  disabled?: boolean;
  width: string;
  height: string;
  borderRadius: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  background-color: ${({ theme }) => theme.palette.primary.orange};
  color: white;
  border-radius: ${({ borderRadius }) => borderRadius};

  font-weight: 500;
  font-size: 2rem;

  &:hover {
    filter: brightness(95%);
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.palette.grey[400]};
      background-color: ${theme.palette.grey[100]};
      cursor: default;

      &:hover {
        filter: brightness(100%);
      }
    `}
`;
