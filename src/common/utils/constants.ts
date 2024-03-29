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
  auth: 'auth',
  accessToken: 'accessToken',
  storeId: 'storeId',
  storeName: 'storeName',
  mainImage: 'mainImage',
  introduction: 'introduction',
} as const;

export const mutationKeys = {
  LOGIN: 'login',
};

export const queryKeys = {
  GET_SHOP: 'shop',
  GET_SPACES: 'spaces',
  GET_SPACE_LAYOUT: 'spaceLayout',
  GET_PERMISSION: 'permission',
  GET_OWNED_SHOPS: 'ownedShops',
  GET_INFINITE_RESERVATIONS: 'infiniteReservations',
  GET_SEAT_STATISTICS: 'spaceStatistics',
  GET_CURRENTLY_IN_USE: 'currentlyInUse',
  GET_SHOP_INFORMATION: 'shopInformation',
};

export const TEMPORARY_SPACE_ID = -1;
export const NO_SPACE_ID = -2;
