import axios from 'axios';
import { STORAGE } from 'common/utils/constants';

const ENDPOINT = process.env.REACT_APP_API_URL;

export const axiosClient = axios.create({
  baseURL: ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(STORAGE.accessToken);

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
