import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import type { ErrorResponse } from 'api/lib/auth';
import type { SubmitHandler } from 'react-hook-form';
import { AuthApi } from 'api/lib/auth';
import { PATH, STORAGE } from 'common/utils/constants';
import { Button } from 'components/Button';
import { ErrorMessage } from 'components/ErrorMessage';

import { Input } from 'components/Input';
import {
  Background,
  ContentWrap,
  InputWrap,
  JoinLink,
  JoinRow,
  Label,
  LoginRow,
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
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<LoginFormInputs> = async ({
    email,
    password,
  }) => {
    try {
      const { accessToken, permissionByMenu, storeId } = await AuthApi.signIn(
        email,
        password,
      );

      localStorage.setItem(STORAGE.accessToken, accessToken);
      localStorage.setItem(STORAGE.storeId, String(storeId));

      navigate('/');
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(error.response?.data.message);
      }
      setError('root', {
        message: '아이디 또는 비밀번호를 다시 입력해주세요.',
      });
    }
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
              placeholder='비밀번호를 입력해 주세요.'
              {...register('password')}
            />
          </InputWrap>
          <LoginRow>
            <Label htmlFor='stayLogined'>
              <input type='checkbox' id='stayLogined' />
              로그인 상태 유지
            </Label>
            <Link to='/'>비밀번호를 잊으셨나요?</Link>
          </LoginRow>
          {errors.root && <ErrorMessage>{errors.root?.message}</ErrorMessage>}
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
