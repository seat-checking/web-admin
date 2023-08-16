import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { axiosClient } from 'api/apiClient';
import { STORAGE } from 'common/utils/constants';

interface Chair {
  storeChairId: string; // string으로, 프론트에서 넘겨주는 고유값
  manageId: number;
  chairX: number;
  chairY: number;
}

interface Table {
  storeTableId: string; // string으로, 프론트에서 넘겨주는 고유값
  manageId: number; // 필요없음 (의자만 좌석 번호 필요함)
  width: number;
  height: number; // 추가
  tableX: number;
  tableY: number;
}

export interface ShopLayout {
  storeSpaceId: number;
  storeSpaceName: string; // 추가
  width: number; // 필요없음 (가로 길이 고정돼있음)
  height: number;
  tableList: Table[];
  chairList: Chair[];
}

interface LayoutResponse {
  storeId: number;
  adminStoreSpaceResponseList: ShopLayout[];
}

interface Space {
  storeSpaceId: number;
  name: string;
}

export class ShopApi {
  static readonly apiPrefix = '/stores/admins';

  // 가게의 모든 스페이스 기본 정보 조회
  static getSpaceList = async (): Promise<Space[]> => {
    const storeId = localStorage.getItem(STORAGE.storeId);
    const response = await axiosClient.get(
      `${this.apiPrefix}/spaces/${storeId}`,
    );
    return response.data.result;
  };

  // 스페이스별 가게 형태 조회
  static getLayout = async (spaceId: number) => {
    const response = await axiosClient.get(
      `${this.apiPrefix}/spaces/seats/${spaceId}`,
    );
    return response.data.result;
  };

  // 스페이스 생성
  static saveShopLayout = async (): Promise<any> => {
    const storeId = localStorage.getItem(STORAGE.storeId);
    const req = {
      name: '블루룸',
      height: 10,
      reservationUnit: '좌석',
      tableList: [
        {
          storeTableId: '15445',
          tableX: 10,
          tableY: 10,
          tableWidth: 2,
          tableHeight: 4,
        },
      ],
      chairList: [
        {
          storeChairId: '15446',
          manageId: 2,
          chairX: 1,
          chairY: 1,
        },
        {
          storeChairId: '15447',
          manageId: 2,
          chairX: 3,
          chairY: 3,
        },
      ],
    };

    const response = await axiosClient.post(
      `${this.apiPrefix}/spaces/${storeId}`,
      req,
    );
    return response;
  };

  // 스페이스 삭제
  static deleteSpace = async (spaceId: number) => {
    await axiosClient.delete(`${this.apiPrefix}/spaces/${spaceId}`);
  };
}
