import { Link } from 'react-router-dom';
import { PATH } from 'common/utils/constants';
import { Button } from 'components/Button';
import { ErrorMessage } from 'components/ErrorMessage';

import {
  Background,
  ContentWrap,
  GappedInput,
  JoinLink,
  JoinRow,
  Label,
  LoginRow,
  OrangeText,
  Title,
} from 'pages/LoginPage/styled';

/**
 * 로그인 페이지
 */

export const LoginPage: React.FC = () => {
  const isWrongUser = true;
  // const isWrongUser = false;
  return (
    <Background>
      <ContentWrap>
        <Title>관리자 로그인</Title>
        <GappedInput label='이메일' placeholder='이메일을 입력해 주세요.' />
        <GappedInput label='비밀번호' placeholder='비밀번호를 입력해 주세요.' />
        <LoginRow>
          <Label htmlFor='stayLogined'>
            <input type='checkbox' id='stayLogined' />
            로그인 상태 유지
          </Label>
          <Link to='/'>비밀번호를 잊으셨나요?</Link>
        </LoginRow>
        {isWrongUser && (
          <ErrorMessage>아이디 또는 비밀번호를 다시 입력해주세요</ErrorMessage>
        )}
        <JoinRow>
          <OrangeText>계정이 없으신가요?</OrangeText>
          <JoinLink to={`/${PATH.join}`}>회원가입</JoinLink>
        </JoinRow>
        <Button>로그인</Button>
      </ContentWrap>
    </Background>
  );
};
