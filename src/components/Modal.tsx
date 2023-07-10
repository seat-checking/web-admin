import type React from 'react';
import { ModalOverlay, ModalWrapper } from 'components/Modal.styled';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper>{children}</ModalWrapper>
    </ModalOverlay>
  );
};
