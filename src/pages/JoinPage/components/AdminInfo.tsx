import { Form } from 'react-router-dom';
import type { JoinFormInputs } from 'common/utils/types';
import type { InnerPageProps } from 'pages/JoinPage/utils/types';
import type { SubmitHandler, ChangeHandler } from 'react-hook-form';
import { AuthApi } from 'api/lib/auth';
import { PATH } from 'common/utils/constants';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';
import {
  LoginLink,
  LoginRow,
  Description,
  BottomWrap,
  GappedErrorMessage,
  InputWrap,
  RadioRow,
} from 'pages/JoinPage/components/AdminInfo.styled';

/**
 * 관리자 회원가입 > 첫 번쨰 화면에서 보여줄 컴포넌트 (관리자 정보 입력 페이지)
 */
export const AdminInfo: React.FC<InnerPageProps> = ({
  onClickNext,
  useJoinForm,
}) => {
  const {
    register,
    setError,
    getValues,
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
  } = useJoinForm;

  const onSubmit: SubmitHandler<JoinFormInputs> = () => {
    onClickNext('SECOND');
    window.history.pushState({ page: 1 }, '');
  };

  const handleValidateNickname: ChangeHandler = async (e) => {
    if (errors.nickname) return;
    try {
      const response = await AuthApi.validateNickname(e.target.value);

      const isValidNickname = response.data.result.isValid;
      if (!isValidNickname) {
        setError('nickname', { message: '중복된 닉네임입니다.' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidateEmail: ChangeHandler = async (event) => {
    if (errors.email) return;
    try {
      const response = await AuthApi.validateEmail(event.target.value);

      const isValidEmail = response.data.result.isValid;
      if (!isValidEmail) {
        setError('email', { message: '중복된 이메일입니다.' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidatePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const passwordChecked = getValues('passwordChecked');
    if (passwordChecked.length === 0) {
      return;
    }

    const password = event.target.value;
    if (password === passwordChecked) {
      clearErrors('passwordChecked');
    } else {
      setError('passwordChecked', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputWrap>
        <Input
          label='이메일'
          placeholder='이메일을 입력해주세요'
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '@를 포함한 이메일 형식으로 작성해 주세요.',
            },
            onBlur: handleValidateEmail,
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
          type='password'
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            pattern: {
              value: /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,20}$/,
              message: '영문, 숫자, 특수기호를 포함하여 8~20자로 입력해주세요.',
            },
            onChange: handleValidatePassword,
          })}
        />
        {errors.password && (
          <GappedErrorMessage>{errors.password?.message}</GappedErrorMessage>
        )}
      </InputWrap>
      <InputWrap>
        <Input
          label='비밀번호 확인'
          placeholder='비밀번호를 한번 더 입력해주세요'
          type='password'
          {...register('passwordChecked', {
            required: '비밀번호 확인은 필수 입력입니다.',
            validate: {
              isSame: (value, formValues: JoinFormInputs) =>
                value === formValues.password ||
                '비밀번호가 일치하지 않습니다.',
            },
          })}
        />
        {errors.passwordChecked && (
          <GappedErrorMessage>
            {errors.passwordChecked?.message}
          </GappedErrorMessage>
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
            onBlur: handleValidateNickname,
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
        <Label label='성별' />
        <RadioRow>
          <Radio
            id='female'
            label='여성'
            value='여성'
            {...register('sex', { required: '성별을 선택해주세요.' })}
          />
          <Radio
            id='male'
            label='남성'
            value='남성'
            {...register('sex', { required: '성별을 선택해주세요.' })}
          />
        </RadioRow>
      </InputWrap>
      <BottomWrap>
        <Button isDisabled={!isValid}>다음</Button>
        <LoginRow>
          <Description>이미 계정이 있나요?</Description>
          <LoginLink to={`/${PATH.login}`}>로그인하기</LoginLink>
        </LoginRow>
      </BottomWrap>
    </Form>
  );
};
