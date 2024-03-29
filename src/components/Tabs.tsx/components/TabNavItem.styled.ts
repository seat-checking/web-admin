import styled, { css } from 'styled-components';

export const ListItem = styled.li<{
  active?: boolean;
  $isClickable: boolean;
}>`
  flex: 1;
  z-index: 1;

  ${({ $isClickable }) =>
    $isClickable &&
    css`
      cursor: pointer;
      position: relative;
      :hover::after {
        display: inline-block;
        content: '';
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        width: calc(100% - 1rem);
        height: calc(100% - 1rem);
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 1rem;
      }
    `}
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
