import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { axiosClient } from 'api/apiClient';
import { STORAGE } from 'common/utils/constants';

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
export interface CreateShopLayout {
  name: string;
  reservationUnit: ReservationUnit;
  height: number;
  tableList: Table[];
  chairList: Chair[];
}

export interface GetShopLayoutResponse extends ShopLayout {
  storeSpaceId: number;
}

export interface EditShopRequest {
  spaceId: number;
  layout: ShopLayout;
}

export class ShopApi {
  static readonly apiPrefix = '/stores/admins';

  // 가게의 모든 스페이스 기본 정보 조회
  static getSpaceList = async (): Promise<SpaceType[]> => {
    const storeId = localStorage.getItem(STORAGE.storeId);
    const response = await axiosClient.get(
      `${this.apiPrefix}/spaces/${storeId}`,
    );
    return response.data.result;
  };

  // 스페이스별 가게 형태 조회
  static getLayout = async (
    spaceId: number,
  ): Promise<GetShopLayoutResponse> => {
    const response = await axiosClient.get(
      `${this.apiPrefix}/spaces/seats/${spaceId}`,
    );
    return response.data.result;
  };

  // 스페이스 생성
  static createShopLayout = async (
    layout: CreateShopLayout,
  ): Promise<number> => {
    const storeId = localStorage.getItem(STORAGE.storeId);

    const response = await axiosClient.post(
      `${this.apiPrefix}/spaces/${storeId}`,
      layout,
    );
    return response.data.result.storeSpaceId;
  };

  // 스페이스 삭제
  static deleteSpace = async (spaceId: number) => {
    await axiosClient.delete(`${this.apiPrefix}/spaces/${spaceId}`);
  };

  static editShopLayout = async ({ spaceId, layout }: EditShopRequest) => {
    const response = await axiosClient.patch(
      `${this.apiPrefix}/spaces/${spaceId}`,
      layout,
    );
    return response;
  };
}
