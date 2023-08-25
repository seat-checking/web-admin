import { STORAGE } from 'common/utils/constants';

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(STORAGE.accessToken);
  return accessToken;
};

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(STORAGE.accessToken, accessToken);
};

type MenuType =
  | 'storeStatus'
  | 'storeSetting'
  | 'storeStatistics'
  | 'seatSetting';

export interface Permission {
  storeStatus: boolean;
  storeSetting: boolean;
  storeStatistics: boolean; // not using
  seatSetting: boolean;
}

export const getPermission = (menu: MenuType) => {
  return localStorage.getItem(menu) === 'true';
};

export const setPermissions = (permissions: Permission) => {
  localStorage.setItem('storeStatus', permissions.storeStatus.toString());
  localStorage.setItem('storeSetting', permissions.storeSetting.toString());
  localStorage.setItem('seatSetting', permissions.seatSetting.toString());
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  if (token) return true;
  return false;
};
