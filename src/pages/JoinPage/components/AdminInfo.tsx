import type { InnerPageProps, JoinStatus } from 'pages/JoinPage/utils/types';
import { PATH } from 'common/utils/constants';
import { Button } from 'components/Button';
import {
  LoginLink,
  LoginRow,
  Description,
  GappedInput,
  BottomWrap,
} from 'pages/JoinPage/components/AdminInfo.styled';
/**
 * 관리자 회원가입 > 첫 번쨰 화면에서 보여줄 컴포넌트 (관리자 정보 입력 페이지)
 */
export const AdminInfo: React.FC<InnerPageProps> = ({ onClickNext }) => {
  return (
    <div>
      <GappedInput label='이메일' placeholder='이메일을 입력해주세요' />
      <GappedInput label='비밀번호' placeholder='비밀번호를 입력해주세요' />
      <GappedInput label='닉네임' placeholder='닉네임을 입력해주세요' />
      <GappedInput label='나이' placeholder='나이를 입력해주세요' />
      <GappedInput label='성별' placeholder='이메일을 입력해주세요' />
      <BottomWrap>
        <Button onClick={() => onClickNext('SECOND')}>다음</Button>
        <LoginRow>
          <Description>이미 계정이 있나요?</Description>
          <LoginLink to={`/${PATH.login}`}>로그인하기</LoginLink>
        </LoginRow>
      </BottomWrap>
    </div>
  );
};
