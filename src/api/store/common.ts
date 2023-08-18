const DOMAIN = process.env.REACT_APP_API_URL;

/**
 * api path를 이용해서 full url로만듬
 * @param path '/v1'로 시작하는 url경로
 * @returns domain이 포함된 full url
 */
export const getApiUrl = (path: string) => {
  return DOMAIN + path;
};
export interface SuccessOkWithoutResultResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  status: number;
}

export interface SuccessOkResponse<T> extends SuccessOkWithoutResultResponse {
  result: T;
}

export interface ErrorResponse {
  success: false;
  code: string;
  message: string;
  status: number;
  errors: [];
}
