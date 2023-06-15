import styled, { css } from 'styled-components';

export const ListItem = styled.li`
  flex: 1;
`;

export const Button = styled.button<{ active?: boolean }>`
  width: 100%;
  height: 100%;

  /* background-color: aqua; */

  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const Text = styled.p<{ active?: boolean }>`
  width: fit-content;
  height: 100%;
  margin: auto;

  display: flex;
  align-items: center;

  font-size: 2.4rem;
  line-height: 2.9rem;
  font-weight: 500;
  color: gray;

  ${({ active, theme }) =>
    active &&
    css`
      color: #505462;
      box-shadow: 0 -0.3rem ${theme.palette.primary.orange} inset; // 위치 고정한채로 안쪽에 테두리 생기도록함
    `};
`;
