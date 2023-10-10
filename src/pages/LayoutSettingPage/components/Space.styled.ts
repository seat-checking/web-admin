import styled, { css } from 'styled-components/macro';
import { ellipsisText, flexSet } from 'styles/mixin';

export const SpaceBox = styled.div<{ isSelected: boolean }>`
  position: relative;
  cursor: pointer;

  width: 17.1rem;
  height: 9.1rem;
  border-radius: 0.8rem;

  background-color: #fff;
  opacity: 0.5;

  & + & {
    margin-left: 1.2rem;
  }

  ${flexSet()}

  input {
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      opacity: 1;
    `}
`;

export const Name = styled.div<{ $length?: number }>`
  max-width: 16rem;

  text-align: center;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;

  ${({ $length }) =>
    $length &&
    $length > 7 &&
    css`
      font-size: 1.8rem;
      line-height: 2rem;
    `}

  ${ellipsisText(2)}
`;

export const BtnsRow = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;

  display: flex;
  gap: 1rem;

  /* background-color: yellow; */
`;
