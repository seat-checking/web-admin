import type {
  EditShopRequest,
  GetShopLayoutResponse,
  ShopLayout,
  ToggleCloseTodayRequest,
} from 'api/shop/types';
import type { Permission } from 'common/utils/auth';
import type {
  DropdownShop,
  ShopInfoForm,
  ShopInformationForm,
} from 'common/utils/types';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { axiosClient } from 'api/apiClient';

import { STORAGE } from 'common/utils/constants';

export const addShop = async (shopInfoForm: ShopInfoForm) => {
  const response = await axiosClient.post(
    '/stores/admins/new-business-information',
    shopInfoForm,
  );
  return response.data.result;
};

export const getOwnedShops = async (): Promise<DropdownShop[]> => {
  const response = await axiosClient.get('/stores/admins/owned');
  return response.data.result.storeResponseList;
};

export const toggleCloseToday = async ({
  shopId,
  isClosedToday,
}: ToggleCloseTodayRequest) => {
  const response = await axiosClient.patch(
    `/stores/admins/temporary-closed/${shopId}`,
    { closedToday: isClosedToday },
  );
  return response.data.result;
};

export const getShopPermission = async (
  shopId: number,
): Promise<Permission> => {
  const response = await axiosClient.get(`/stores/admins/permission/${shopId}`);

  return JSON.parse(response.data.result.permissionByMenu);
};

export const getShopInformation = async (): Promise<ShopInformationForm> => {
  const shopId = localStorage.getItem(STORAGE.storeId);

  const response = await axiosClient.get(
    `/stores/admins/basic-information/${shopId}`,
  );

  return response.data.result;
};

export const editShopInformation = async (mainImage: File[]) => {
  const shopId = localStorage.getItem(STORAGE.storeId);

  const formData = new FormData();
  formData.append('storeName', 'history');
  formData.append('address', '1번지');
  formData.append('detailAddress', '자세한');
  formData.append('category', '음식점');
  formData.append('introduction', '소개');
  mainImage.forEach((image) => {
    formData.append(`file`, image);
  });

  const response = await axiosClient.patch(
    `/stores/admins/basic-information/${shopId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.result;
};

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
  static createShopLayout = async (layout: ShopLayout): Promise<number> => {
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
