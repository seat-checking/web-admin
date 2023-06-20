import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import type { StoreInfoProps } from 'pages/JoinPage/components/StoreInfo';
import type { SubmitHandler } from 'react-hook-form';
import { PATH } from 'common/utils/constants';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import {
  LoginLink,
  LoginRow,
  Description,
  BottomWrap,
  GappedErrorMessage,
  InputWrap,
} from 'pages/JoinPage/components/AdminInfo.styled';

interface FormInputs {
  email: string;
  password: string;
  nickname: string;
  age: number;
}

/**
 * 관리자 회원가입 > 첫 번쨰 화면에서 보여줄 컴포넌트 (관리자 정보 입력 페이지)
 */
export const AdminInfo: React.FC<StoreInfoProps> = ({ onClickNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    onClickNext('SECOND');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputWrap>
        <Input
          className='hi'
          label='이메일'
          placeholder='이메일을 입력해주세요'
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '@를 포함한 이메일 형식으로 작성해 주세요.',
            },
          })}
        />
        {errors.email && (
          <GappedErrorMessage>{errors.email?.message}</GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <Input
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            pattern: {
              value: /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,20}$/,
              message: '영문, 숫자, 특수기호를 포함하여 8~20자로 입력해주세요.',
            },
          })}
        />
        {errors.password && (
          <GappedErrorMessage>{errors.password?.message}</GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <Input
          label='닉네임'
          placeholder='닉네임을 입력해주세요'
          {...register('nickname', {
            required: '닉네임은 필수 입력입니다.',
            pattern: {
              value: /^[A-Za-z0-9ㄱ-ㅎ가-힣]{2,10}$/,
              message:
                '2~10자의 한글, 영문(대소문자 포함), 숫자만 입력가능합니다.',
            },
          })}
        />
        {errors.nickname && (
          <GappedErrorMessage>{errors.nickname?.message}</GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <Input
          className='gap'
          label='나이'
          placeholder='나이를 입력해주세요'
          {...register('age', {
            required: '나이는 필수 입력입니다.',
            pattern: {
              value: /^(?:[1-9]|[1-9][0-9])$/,
              message: '유효한 나이를 입력해주세요.',
            },
          })}
        />
        {errors.age && (
          <GappedErrorMessage>{errors.age?.message}</GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <Input
          className='gap'
          label='성별'
          placeholder='이메일을 입력해주세요'
        />
      </InputWrap>
      <BottomWrap>
        <Button>다음</Button>
        <LoginRow>
          <Description>이미 계정이 있나요?</Description>
          <LoginLink to={`/${PATH.login}`}>로그인하기</LoginLink>
        </LoginRow>
      </BottomWrap>
    </Form>
  );
};
