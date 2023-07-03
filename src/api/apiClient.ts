import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_API_URL;

export const axiosClient = axios.create({
  baseURL: ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
