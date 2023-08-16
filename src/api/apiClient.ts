import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import { getAccessToken, setAccessToken } from 'common/utils/auth';

const ENDPOINT = process.env.REACT_APP_API_URL;

export const axiosClient = axios.create({
  baseURL: ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers.authorization) {
      console.log('토큰 만료!!!!!!!!!');
      const newToken = response.headers.authorization;
      setAccessToken(newToken);
      axios.defaults.headers.common.Authorization = newToken;
    }
    return response;
  },
  (error) => {
    // TODO 리프레시 만료 시 cors 뜸
    console.log('error (응답 인터셉터) :>> ', error, error.response);
    if (error.code === AxiosError.ERR_NETWORK) {
      // window.alert('네트워크 오류');
    }
    return Promise.reject(error);
  },
);
