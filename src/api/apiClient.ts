import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';

const ENDPOINT = process.env.REACT_APP_API_URL;

export const axiosClient = axios.create({
  baseURL: ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.log('error (응답 인터셉터) :>> ', error);
    if (error.code === AxiosError.ERR_NETWORK) {
      window.alert('네트워크 오류');
    }
    return Promise.reject(error);
  },
);
