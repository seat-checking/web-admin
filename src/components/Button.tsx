import { useTheme } from 'styled-components';
import { StyledButton } from 'components/Button.styled';

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  borderRadius?: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  backgroundColor?: string;
  color?: string;
}

/**
 * 여러 페이지에서 사용될 기본적인 버튼 컴포넌트
 */
export const Button: React.FC<ButtonProps> = ({
  onClick,
  width = '100%',
  height = '5.6rem',
  borderRadius = '0.8rem',
  isDisabled,
  type = 'submit',
  children,
  backgroundColor,
  color = 'white',
  ...rest
}) => {
  const theme = useTheme();
  const bgColor = backgroundColor || theme.palette.primary.orange;
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      width={width}
      height={height}
      borderRadius={borderRadius}
      bgColor={bgColor}
      color={color}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
