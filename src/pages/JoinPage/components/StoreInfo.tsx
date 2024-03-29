import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { JoinForm } from 'common/utils/types';
import type { InnerPageProps } from 'pages/JoinPage/utils/types';
import type { Address } from 'react-daum-postcode';
import type { SubmitHandler } from 'react-hook-form';
import { useJoin } from 'common/hooks/mutations/useJoin';
import { useAddress } from 'common/hooks/useAddress';
import { PATH } from 'common/utils/constants';
import { AddressBox } from 'components/AddressBox';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import {
  BottomWrap,
  DateInput,
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
  const { mutate: joinMutate } = useJoin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useJoinForm;

  const { open, handleComplete } = useAddress();

  const onSubmit: SubmitHandler<JoinForm> = (data) => {
    joinMutate(data, {
      onSuccess: () => {
        onClickNext('FIRST'); // 초기화
        navigate(`/${PATH.login}`, { replace: true });
      },
      onError: (error) => {
        console.error(error);
      },
    });
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
          label='가게 이름'
          placeholder='가게 이름을 입력해주세요'
          {...register('storeName', {
            required: '가게 이름은 필수 입력입니다.',
          })}
        />
        {errors.storeName && (
          <GappedErrorMessage>{errors.storeName?.message}</GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <Label label='가게 위치' />
        <Controller
          control={control}
          name='address'
          rules={{ required: '주소를 선택해주세요' }}
          render={({ field: { onChange, value } }) => (
            <AddressBox
              value={value}
              onClick={(e) => {
                e.preventDefault();
                open({
                  onComplete: (data: Address) => {
                    const fullAddress = handleComplete(data);
                    onChange(fullAddress);
                  },
                });
              }}
            />
          )}
        />
        <Input
          placeholder='상세 주소'
          {...register('detailAddress', {
            required: '상세 주소를 입력해주세요.',
          })}
        />
        {errors.detailAddress && (
          <GappedErrorMessage>
            {errors.detailAddress?.message}
          </GappedErrorMessage>
        )}
        {errors.address && (
          <GappedErrorMessage>{errors.address?.message}</GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <Input
          label='사업자등록번호'
          placeholder='숫자 10자리를 입력해주세요.'
          maxLength={10}
          {...register('businessRegistrationNumber', {
            required: '사업자등록번호는 필수 입력입니다.',
            pattern: {
              value: /^\d{10}$/,
              message: '숫자 10자리를 입력해주세요.',
            },
          })}
        />
        {errors.businessRegistrationNumber && (
          <GappedErrorMessage>
            {errors.businessRegistrationNumber?.message}
          </GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <DateInput
          label='개업일자'
          type='date'
          min='1900-01-01'
          max={dayjs(Date.now()).format('YYYY-MM-DD')}
          {...register('openDate', {
            required: '개업일자는 필수 입력입니다.',
            pattern: {
              value:
                /^(?:(?:19|20)\d\d)-(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-9]|3[01])$/,
              message: '유효한 날짜를 입력해주세요',
            },
          })}
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
