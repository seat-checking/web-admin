import React from 'react';
import { useTheme } from 'styled-components';
import { ReactComponent as XIcon } from 'assets/icons/x.svg';
import {
  HeaderWrap,
  ModalOverlay,
  ModalWrapper,
} from 'components/Modal.styled';

interface ModalProps {
  closeOnOusideClick?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> & {
  Header: React.FC<HeaderProps>;
} = ({ onClose, children, closeOnOusideClick = true }) => {
  const handleWrapperClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <ModalOverlay {...(closeOnOusideClick && { onClick: onClose })}>
      <ModalWrapper onClick={handleWrapperClick}>
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement<HeaderProps>(child) &&
            child.type === Modal.Header
          ) {
            return React.cloneElement(child, { onClose });
          }
          return child;
        })}
      </ModalWrapper>
    </ModalOverlay>
  );
};

interface HeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({ children, onClose }) => {
  const theme = useTheme();

  const handleClose = () => {
    onClose?.();
  };

  return (
    <HeaderWrap>
      {children}
      <button type='button' onClick={handleClose}>
        <XIcon stroke={theme.palette.grey[300]} />
      </button>
    </HeaderWrap>
  );
};

Modal.Header = Header;
