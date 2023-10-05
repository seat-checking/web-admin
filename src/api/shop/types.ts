import type { ShopInformationForm } from 'common/utils/types';
import type { ImgFile } from 'pages/ShopSettingPage/components/ShopInfoTab';

export interface ToggleCloseTodayRequest {
  shopId: number;
  isClosedToday: boolean;
}

interface Chair {
  i: string;
  manageId: number | undefined;
  x: number;
  y: number;
}

interface Table {
  i: string;
  w: number;
  h: number;
  x: number;
  y: number;
}

export interface ReservationUnit {
  space: boolean;
  chair: boolean;
}

export interface ShopLayout {
  storeSpaceName: string;
  reservationUnit: ReservationUnit;
  height: number;
  tableList: Table[];
  chairList: Chair[];
}

export interface GetShopLayoutResponse extends ShopLayout {
  storeSpaceId: number;
}

export interface EditShopLayoutRequest {
  spaceId: number;
  layout: ShopLayout;
}

export interface EditShopInformationRequest extends ShopInformationForm {
  shopId: number;
}
