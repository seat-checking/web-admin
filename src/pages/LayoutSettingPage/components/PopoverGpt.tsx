import { useState } from 'react';
import styled from 'styled-components';
import type React from 'react';

interface PopoverProps {
  content?: React.ReactNode;
  children: React.ReactNode;
}

export const PopoverGpt: React.FC<PopoverProps> = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button type='button' onClick={togglePopover}>
      {children}
      {isOpen && <PopoverContent>{content}</PopoverContent>}
    </button>
  );
};

// Styled components below

const PopoverContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -10px; // Tail size
    left: 10px; // Tail position from left
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }
`;
