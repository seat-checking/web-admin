import type { JoinFormInputs } from 'common/utils/types';
import { axiosClient } from 'api/apiClient';

export function signUp({
  email,
  password,
  passwordChecked,
  nickname,
  age,
  sex,
  consentToMarketing,
  consentToTermsOfUser,
  employerIdNumber,
  openDate,
  adminName,
}: JoinFormInputs) {
  return axiosClient.post('/admins/sign-up', {
    email,
    password,
    passwordChecked,
    nickname,
    age,
    sex,
    consentToMarketing: true,
    consentToTermsOfUser: true,
    employerIdNumber,
    openDate,
    adminName,
  });
}

// 로그인 미완
export function signIn(email: string, password: string) {
  return axiosClient.post('/admins/sign-in', {});
}

export function validateNickname(nickname: string) {
  return axiosClient.post('/admins/validate/nickname', {
    nickname,
  });
}

export function validateEmail(email: string) {
  return axiosClient.post('/admins/validate/email', {
    email,
  });
}
