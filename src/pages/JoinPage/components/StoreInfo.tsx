import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { InnerPageProps } from 'pages/JoinPage/utils/types';
import type { UseFormHandleSubmit } from 'react-hook-form';
import { Button } from 'components/Button';
import {
  BottomWrap,
  GappedInput,
} from 'pages/JoinPage/components/StoreInfo.styled';

export interface StoreInfoProps extends InnerPageProps {
  handleSubmit: UseFormHandleSubmit<any, undefined>;
}

/**
 * 관리자 회원가입 > 두 번째 화면에서 보여줄 컴포넌트 (가게 정보 입력 페이지)
 */
export const StoreInfo: React.FC<StoreInfoProps> = ({
  onClickNext,
  handleSubmit,
}) => {
  const navigate = useNavigate();

  const handleClickJoin = () => {
    // try {
    //   const res = await signUp('sumin@email.com', 'sumin12345');
    //   console.log('res :>> ', res);
    // } catch (e) {
    //   console.log('e :>> ', e);
    //   // e.response.status === 500 // 서버 연결 실패
    // }

    // onClickNext('FIRST'); // 초기화
    // navigate('/', { replace: true });

    handleSubmit((data) => {
      console.log('data:>>', data);
    });
  };

  // 뒤로가기 발생 시 회원가입 첫번쨰 페이지로 전환
  useEffect(() => {
    const handleGoBack = () => {
      onClickNext('FIRST');
      navigate('/join');
    };

    window.addEventListener('popstate', handleGoBack);

    return () => {
      window.removeEventListener('popstate', handleGoBack);
    };
  }, [navigate, onClickNext]);

  return (
    <div>
      <GappedInput
        label='사업자등록번호'
        placeholder='숫자 10자리를 입력해주세요.'
      />
      <GappedInput label='개업일자' placeholder='ex): 2023.03.04' />
      <GappedInput label='대표자명' placeholder='이름을 입력해주세요' />
      <BottomWrap>
        <Button onClick={handleClickJoin}>완료</Button>
      </BottomWrap>
    </div>
  );
};
