import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { axiosClient } from 'api/apiClient';

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

export class ShopApi {
  // 관리자 가게 형태 조회 (제거 예정)
  static getAllLayout = async (shopId = 1): Promise<ShopLayout[]> => {
    const response: AxiosResponse<LayoutResponse> = await axiosClient.get(
      `/allLayouts`,
    );
    return response.data.adminStoreSpaceResponseList;
    // const response = await axiosClient.get(`/admin/store/form/${shopId}`);
    // return response.data?.result.adminStoreSpaceResponseList;
  };

  // 스페이스별 가게 형태 조회
  static getLayout = async (shopId = 1, spaceId = 1) => {
    const response = await axiosClient.get(`/allLayoutSumin`, {
      params: { storeSpaceId: spaceId },
    });
    console.log('response.data :>> ', response.data[0]);
    return response.data[0];
  };

  // 관리자 가게 형태 등록
  static saveShopLayout = async (shopId: number): Promise<any> => {
    const req = [
      {
        name: '우하하',
        width: 1,
        height: 1,
        entranceX: 1,
        entranceY: 1,
        tableList: [
          {
            tableX: 1,
            tableY: 1,
            chairList: [
              {
                chairX: 1,
                chairY: 1,
              },
            ],
          },
        ],
      },

      {
        name: '우하j하',
        width: 1,
        height: 1,
        entranceX: 1,
        entranceY: 1,
        tableList: [
          {
            tableX: 1,
            tableY: 1,
            chairList: [
              {
                chairX: 1,
                chairY: 1,
              },
            ],
          },
        ],
      },
    ];
    const response = await axiosClient.post(`/admin/store/form/${shopId}`, req);
    return response;
  };

  // 관리자 가게 스페이스 목록 조회
  static getSpaceList = async (): Promise<any> => {
    const response = await axiosClient.get(`/spacesList`);
    return response.data;
  };
}
