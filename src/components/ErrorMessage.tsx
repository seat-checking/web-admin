import { ReactComponent as ErrorIcon } from 'assets/icons/error.svg';
import { Text, Wrap } from 'components/ErrorMessage.styled';

interface ErrorMessageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children?: string;
  width?: string;
  height?: string;
}

/**
 * 유효성 검사 결과 후 띄우는 에러 메세지 컴포넌트
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  width = '100%',
  height = '3.6rem',
  ...rest
}) => {
  return (
    <Wrap width={width} height={height} {...rest}>
      <ErrorIcon />
      <Text>{children}</Text>
    </Wrap>
  );
};
