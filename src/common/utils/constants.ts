export const PATH = {
  shopStatus: 'shopstatus',
  layout: 'layout',
  setting: 'setting',
  login: 'login',
  join: 'join',
  statistics: 'statistics', // 안쓰임
  addShop: 'addshop',
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
  GET_SHOP: 'getShop',
  GET_OWNED_SHOPS: 'getOwnedShops',
};
