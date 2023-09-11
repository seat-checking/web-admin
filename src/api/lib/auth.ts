import type { JoinForm, LoginForm } from 'common/utils/types';
import { axiosClient } from 'api/apiClient';

export interface ErrorResponse {
  code: string;
  errors: [];
  message: string;
  status: number;
  success: boolean;
}

export interface LoginResponse {
  accessToken: string;
  storeId: number;
  storeName: string;
  mainImage: string | null;
  introduction: string | null;
  permissionByMenu: string;
}

export interface GetShopResponse {
  storeIds: number[];
}

interface SuccessResponse<T> {
  code: string;
  isSuccess: boolean;
  message: string;
  result: T;
  status: number;
}

export class AuthApi {
  static signUp(joinForm: JoinForm) {
    return axiosClient.post('/admins/sign-up', {
      ...joinForm,
      consentToMarketing: true,
      consentToTermsOfUser: true,
    });
  }

  static signIn = async (loginForm: LoginForm): Promise<LoginResponse> => {
    const response = await axiosClient.post('/admins/sign-in', loginForm);
    return response.data.result;
  };

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
