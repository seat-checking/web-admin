import type { ImgFile } from 'pages/ShopSettingPage/components/ShopInfoTab';

interface AdminInfoForm {
  email: string;
  password: string;
  passwordChecked: string;
  nickname: string;
  name: string; // 본명
  birthDate: string;
  sex: string;
  consentToMarketing: boolean;
  consentToTermsOfUser: boolean;
}

export interface ShopInfoForm {
  storeName: string;
  address: string;
  detailAddress: string;
  businessRegistrationNumber: string;
  openDate: string;
  adminName: string; // 대표자명
}

export type JoinForm = AdminInfoForm & ShopInfoForm;

export interface LoginForm {
  email: string;
  password: string;
}

export interface Shop {
  storeId: number;
  storeName: string;
  introduction: string | null;
  mainImage: string | null;
}

export interface DropdownShop extends Shop {
  isOpenNow: boolean;
  isClosedToday: boolean;
}

export interface ShopInformationForm {
  storeName: string;
  address: string;
  detailAddress: string;
  category: '음식점' | '카페' | '모임';
  introduction: string;
  telNum: string;
  storeImages: (string | ImgFile)[] | null;
}

export const INFINITE_OWNED_SHOPS_PAGE_SIZE = 10;
