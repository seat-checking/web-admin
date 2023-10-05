import styled, { css } from 'styled-components/macro';
import { flexSet } from 'styles/mixin';

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

export const Name = styled.div`
  max-width: 16rem;

  text-align: center;
  font-weight: 500;
  font-size: 2.4rem;

  /* background-color: aqua; */
`;

export const BtnsRow = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;

  display: flex;
  gap: 1rem;

  /* background-color: yellow; */
`;
