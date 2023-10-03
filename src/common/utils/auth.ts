import { STORAGE } from 'common/utils/constants';

export const getAccessToken = () => {
  const authStorage = JSON.parse(localStorage.getItem(STORAGE.auth) || '');
  if (authStorage === '') return undefined;
  return authStorage.state.accessToken;
};

export const setAccessToken = (accessToken: string) => {
  const authStorage = JSON.parse(localStorage.getItem(STORAGE.auth) || '');
  authStorage.state.accessToken = accessToken;
  localStorage.setItem(STORAGE.auth, JSON.stringify(authStorage));
};

export interface Permission {
  storeStatus: boolean;
  storeSetting: boolean;
  storeStatistics: boolean; // not using
  seatSetting: boolean;
}

export const isAuthenticated = () => {
  const token = getAccessToken();
  if (token) return true;
  return false;
};
