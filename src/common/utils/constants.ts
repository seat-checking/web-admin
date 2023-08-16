export const PATH = {
  shopStatus: 'shopstatus',
  layout: 'layout',
  setting: 'setting',
  login: 'login',
  join: 'join',
  statistics: 'statistics', // 안쓰임
} as const;

export const STORAGE = {
  accessToken: 'accessToken',
  storeId: 'storeId',
  storeName: 'storeName',
} as const;

export const mutationKeys = {
  LOGIN: 'login',
};

export const queryKeys = {
  GET_SHOP: 'shop',
  GET_SPACES: 'spaces',
  GET_SPACE_LAYOUT: 'spaceLayout',
};

export const TEMPORARY_SPACE_ID = -1;
