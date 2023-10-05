import { isAxiosError } from 'axios';

import { useForm } from 'react-hook-form';
import type { ErrorResponse } from 'api/lib/auth';

import type { SubmitHandler } from 'react-hook-form';
import { useLogin } from 'common/hooks/mutations/useLogin';

import { PATH } from 'common/utils/constants';
import { Button } from 'components/Button';

import { ErrorMessage } from 'components/ErrorMessage';
import { Input } from 'components/Input';
import { LoadingSpinner } from 'components/LoadingSpinner';
import {
  Background,
  ContentWrap,
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
  const { mutate: loginMutate, isLoading } = useLogin();

  const handleLogin: SubmitHandler<LoginFormInputs> = ({ email, password }) => {
    if (isLoading) {
      return;
    }
    loginMutate(
      { email, password },
      {
        onError(error) {
          if (isAxiosError<ErrorResponse>(error)) {
            setError('root', {
              message: '아이디 또는 비밀번호를 잘못 입력했습니다.',
            });
          }
        },
      },
    );
  };
  console.log('error :>> ', errors);

  return (
    <Background>
      <ContentWrap>
        <Title>관리자 로그인</Title>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            label='이메일'
            placeholder='이메일을 입력해 주세요.'
            {...register('email', {
              required: '이메일을 입력해 주세요.',
            })}
          />
          <InputWrap>
            <Input
              label='비밀번호'
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
              {...register('password', {
                required: '비밀번호를 입력해 주세요.',
              })}
            />
          </InputWrap>

          <JoinRow>
            <OrangeText>계정이 없으신가요?</OrangeText>
            <JoinLink to={`/${PATH.join}`}>회원가입</JoinLink>
          </JoinRow>
          {(errors.email || errors.password || errors.root) && (
            <ErrorMessage>
              {errors.email?.message ||
                errors.password?.message ||
                errors.root?.message}
            </ErrorMessage>
          )}
          <Button style={{ marginTop: '2rem' }}>
            {isLoading ? <LoadingSpinner spinnerSize='2.4rem' /> : '로그인'}
          </Button>
        </form>
      </ContentWrap>
    </Background>
  );
};
