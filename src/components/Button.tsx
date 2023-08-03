import { StyledButton } from 'components/Button.styled';

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  borderRadius?: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
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
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
