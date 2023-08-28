import styled, { css } from 'styled-components';

export const StyledButton = styled.button<{
  disabled?: boolean;
  width: string;
  height: string;
  borderRadius: string;
  bgColor: string;
  color: string;
  fontSize: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border-radius: ${({ borderRadius }) => borderRadius};

  font-weight: 500;
  font-size: ${({ fontSize }) => fontSize};
  &:hover {
    filter: brightness(95%);
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.palette.grey[400]};
      background-color: ${theme.palette.grey[200]};
      cursor: default;

      &:hover {
        filter: brightness(100%);
      }
    `}
`;
