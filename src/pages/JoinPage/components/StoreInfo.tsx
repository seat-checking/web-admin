import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { JoinFormInputs } from 'common/utils/types';
import type { InnerPageProps } from 'pages/JoinPage/utils/types';
import type { SubmitHandler } from 'react-hook-form';
import { signUp } from 'api/lib/auth';
import { PATH } from 'common/utils/constants';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import {
  BottomWrap,
  GappedErrorMessage,
  InputWrap,
} from 'pages/JoinPage/components/StoreInfo.styled';

/**
 * 관리자 회원가입 > 두 번째 화면에서 보여줄 컴포넌트 (가게 정보 입력 페이지)
 */
export const StoreInfo: React.FC<InnerPageProps> = ({
  onClickNext,
  useJoinForm,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useJoinForm;

  const onSubmit: SubmitHandler<JoinFormInputs> = async (data) => {
    try {
      await signUp(data);
      onClickNext('FIRST'); // 초기화
      navigate(`/${PATH.login}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  // 뒤로가기 발생 시 회원가입 첫번째 페이지로 전환
  useEffect(() => {
    const handleGoBack = () => {
      onClickNext('FIRST');
    };

    window.addEventListener('popstate', handleGoBack);

    return () => {
      window.removeEventListener('popstate', handleGoBack);
    };
  }, [navigate, onClickNext]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrap>
        <Input
          label='사업자등록번호'
          placeholder='숫자 10자리를 입력해주세요.'
          {...register('employerIdNumber', {
            required: '사업자등록번호는 필수 입력입니다.',
            pattern: {
              value: /^\d{10}$/,
              message: '숫자 10자리를 입력해주세요.',
            },
          })}
        />
        {errors.employerIdNumber && (
          <GappedErrorMessage>
            {errors.employerIdNumber?.message}
          </GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <Input
          label='개업일자'
          type='date'
          {...register('openDate', {
            required: '개업일자는 필수 입력입니다.',
            pattern: {
              value:
                /^(?:(?:19|20)\d\d)-(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-9]|3[01])$/,
              message: '유효한 날짜를 입력해주세요',
            },
          })}
          style={{ width: 'fit-content' }}
        />
        {errors.openDate && (
          <GappedErrorMessage>{errors.openDate?.message}</GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <Input
          label='대표자명'
          placeholder='이름을 입력해주세요'
          {...register('adminName', {
            required: '이름은 필수 입력입니다.',
            pattern: {
              value: /^[가-힣]+$/,
              message: '공백없이 한글만 입력가능합니다.',
            },
          })}
        />
        {errors.adminName && (
          <GappedErrorMessage>{errors.adminName?.message}</GappedErrorMessage>
        )}
      </InputWrap>
      <BottomWrap>
        <Button isDisabled={!isValid}>완료</Button>
      </BottomWrap>
    </form>
  );
};
