import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import type React from 'react';

interface PopoverProps {
  content?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      onClose?.();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <PopoverContainer ref={containerRef}>
      <PopoverContent>히히</PopoverContent>
    </PopoverContainer>
  );
};

// Styled components below

const PopoverContainer = styled.div`
  position: relative;
  /* display: inline-block; */
`;

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
