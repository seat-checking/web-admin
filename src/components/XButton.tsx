import styled, { useTheme } from 'styled-components';
import type { ComponentPropsWithoutRef } from 'react';
import { ReactComponent as XIcon } from 'assets/icons/x.svg';

interface XButtonProps extends ComponentPropsWithoutRef<'button'> {
  onClick?: () => void;
}

/**
 * X 표 버튼
 */
export const XButton: React.FC<XButtonProps> = ({ onClick, ...rest }) => {
  const theme = useTheme();

  return (
    <Button type='button' onClick={onClick} {...rest}>
      <XIcon stroke={theme.palette.grey[500]} />
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
