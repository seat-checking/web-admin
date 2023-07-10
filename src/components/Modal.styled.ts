import styled from 'styled-components';

export const ModalWrapper = styled.div`
  width: 35.4rem;
  height: 21.7rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1.2rem;
  box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.3);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
