import { StyledButton } from 'components/Button.styled';

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

/**
 * 여러 페이지에서 사용될 기본적인 버튼 컴포넌트
 */
export const Button: React.FC<ButtonProps> = ({
  onClick,
  isDisabled,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      type='button'
      onClick={onClick}
      disabled={isDisabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
