import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { axiosClient } from 'api/apiClient';
import { STORAGE } from 'common/utils/constants';

interface Chair {
  storeChairId: string;
  manageId: number;
  chairX: number;
  chairY: number;
}

interface Table {
  storeTableId: string;
  manageId: number; // 필요없음 (의자만 좌석 번호 필요함)
  width: number;
  height: number;
  tableX: number;
  tableY: number;
}

interface TableForEdit {
  storeTableId: string;
  tableWidth: number;
  tableHeight: number;
  tableX: number;
  tableY: number;
}

export interface ShopLayout {
  storeSpaceId: number;
  storeSpaceName: string;
  reservationUnit: string; // 추가
  width: number; // 필요없음 (가로 길이 고정돼있음)
  height: number;
  tableList: Table[];
  chairList: Chair[];
}

export interface EditShopLayout {
  name: string;
  height: number;
  reservationUnit: string;
  tableList: TableForEdit[];
  chairList: Chair[];
}

export interface EditShopRequest {
  spaceId: number;
  layout: EditShopLayout;
}

interface LayoutResponse {
  storeId: number;
  adminStoreSpaceResponseList: ShopLayout[];
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
  static getLayout = async (spaceId: number): Promise<ShopLayout> => {
    const response = await axiosClient.get(
      `${this.apiPrefix}/spaces/seats/${spaceId}`,
    );
    return response.data.result;
  };

  // 스페이스 생성
  static createShopLayout = async (layout: EditShopLayout) => {
    const storeId = localStorage.getItem(STORAGE.storeId);

    const response = await axiosClient.post(
      `${this.apiPrefix}/spaces/${storeId}`,
      layout,
    );
    return response;
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
