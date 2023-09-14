import styled, { css } from 'styled-components';

export const ModalWrapper = styled.div`
  width: 35.4rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1.2rem;
  box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.3);
`;

export const ModalOverlay = styled.div<{ $isClickable: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;

  ${({ $isClickable }) =>
    !$isClickable &&
    css`
      cursor: default;
    `}
`;

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1.2rem 1.6rem;

  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 700;

  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[50]};
`;
