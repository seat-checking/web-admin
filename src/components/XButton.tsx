import styled from 'styled-components/macro';
import type { ComponentPropsWithoutRef } from 'react';

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

/**
 * 마우스 오버시 어두운 배경 생기는 버튼
 */
export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  ...rest
}) => {
  return (
    <Button type='button' onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  position: relative;
  :hover::after {
    display: inline-block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2.4rem;
    height: 2.4rem;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20%;
  }
`;
