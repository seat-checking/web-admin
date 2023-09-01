import { isAxiosError } from 'axios';

import { useForm } from 'react-hook-form';
import type { ErrorResponse } from 'api/lib/auth';

import type { SubmitHandler } from 'react-hook-form';
import { useLogin } from 'common/hooks/mutations/useLogin';
import { PATH } from 'common/utils/constants';
import { Button } from 'components/Button';

import { Input } from 'components/Input';
import {
  Background,
  ContentWrap,
  ErrorMessageGap,
  InputWrap,
  JoinLink,
  JoinRow,
  OrangeText,
  Title,
} from 'pages/LoginPage/styled';

interface LoginFormInputs {
  email: string;
  password: string;
}
/**
 * 로그인 페이지
 */

export const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { mutate: loginMutate } = useLogin();

  const handleLogin: SubmitHandler<LoginFormInputs> = ({ email, password }) => {
    loginMutate(
      { email, password },
      {
        onError(error) {
          if (isAxiosError<ErrorResponse>(error)) {
            console.log(error.response?.data.message);
            setError('root', {
              message: '아이디 또는 비밀번호를 다시 입력해주세요.',
            });
          }
        },
      },
    );
  };

  console.log('errors :>> ', errors);
  return (
    <Background>
      <ContentWrap>
        <Title>관리자 로그인</Title>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            label='이메일'
            placeholder='이메일을 입력해 주세요.'
            {...register('email')}
          />
          <InputWrap>
            <Input
              label='비밀번호'
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
              {...register('password')}
            />
          </InputWrap>

          {errors.root && (
            <ErrorMessageGap>{errors.root?.message}</ErrorMessageGap>
          )}
          <JoinRow>
            <OrangeText>계정이 없으신가요?</OrangeText>
            <JoinLink to={`/${PATH.join}`}>회원가입</JoinLink>
          </JoinRow>
          <Button>로그인</Button>
        </form>
      </ContentWrap>
    </Background>
  );
};
