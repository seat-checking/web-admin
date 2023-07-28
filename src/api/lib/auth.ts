import type { AxiosResponse } from 'axios';
import type { JoinFormInputs } from 'common/utils/types';
import { axiosClient } from 'api/apiClient';

export interface ErrorResponse {
  code: string;
  errors: [];
  message: string;
  status: number;
  success: boolean;
}

export class AuthApi {
  static signUp({
    email,
    password,
    passwordChecked,
    nickname,
    name,
    age,
    sex,
    consentToMarketing,
    consentToTermsOfUser,
    businessRegistrationNumber,
    openDate,
    adminName,
  }: JoinFormInputs) {
    return axiosClient.post('/admins/sign-up', {
      email,
      password,
      passwordChecked,
      nickname,
      name: adminName, // TODO 디자인 시안에 이름 입력창 추가 반영 후 작업
      age,
      sex,
      consentToMarketing: true,
      consentToTermsOfUser: true,
      businessRegistrationNumber,
      openDate,
      adminName,
    });
  }

  static signIn(email: string, password: string): Promise<AxiosResponse> {
    return axiosClient.post('/admins/sign-in', {
      email,
      password,
    });
  }

  static validateNickname(nickname: string) {
    return axiosClient.post('/admins/validate/nickname', {
      nickname,
    });
  }

  static validateEmail(email: string) {
    return axiosClient.post('/admins/validate/email', {
      email,
    });
  }
}
