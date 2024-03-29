import type {
  CurrentlyInUseResponse,
  GetSeatStatisticsResponse,
  EditShopInformationRequest,
  EditShopLayoutRequest,
  GetShopLayoutResponse,
  ShopLayout,
  ToggleCloseTodayRequest,
  OwnedShopsRequest,
} from 'api/shop/types';
import type { Permission } from 'common/utils/auth';
import type {
  DropdownShop,
  ShopInfoForm,
  ShopInformationForm,
} from 'common/utils/types';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { axiosClient } from 'api/apiClient';
import { INFINITE_OWNED_SHOPS_PAGE_SIZE } from 'common/utils/types';

export const addShop = async (shopInfoForm: ShopInfoForm) => {
  const response = await axiosClient.post(
    '/stores/admins/new-business-information',
    shopInfoForm,
  );
  return response.data.result;
};

export const getInfiniteOwnedShops = async ({
  page = 1,
}: OwnedShopsRequest): Promise<DropdownShop[]> => {
  const response = await axiosClient.get('/stores/admins/owned', {
    params: {
      page,
      size: INFINITE_OWNED_SHOPS_PAGE_SIZE,
      sort: 'id',
    },
  });
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

export const getSeatStatistics = async (
  shopId: number | null,
): Promise<GetSeatStatisticsResponse> => {
  const response = await axiosClient.get(
    `/stores/seats/statistics_information/${shopId}`,
  );
  return response.data.result;
};

export const getCurrentlyInUse = async (
  spaceId: number,
): Promise<CurrentlyInUseResponse> => {
  const response = await axiosClient.get(
    `/utilization/seat/current-in-use/${spaceId}`,
  );
  return response.data.result;
};

export const getShopInformation = async (
  shopId: number | null,
): Promise<ShopInformationForm> => {
  const response = await axiosClient.get(
    `/stores/admins/basic-information/${shopId}`,
  );

  return response.data.result;
};

export const editShopInformation = async (
  params: EditShopInformationRequest,
) => {
  const formData = new FormData();
  formData.append('store-id', String(params.shopId));
  formData.append('storeName', params.storeName);
  formData.append('address', params.address);
  formData.append('detailAddress', params.detailAddress);
  formData.append('category', params.category);
  formData.append('introduction', params.introduction);
  formData.append('telNum', params.telNum);
  params.storeImages?.forEach((image) => {
    if (typeof image === 'string') {
      formData.append(`originImages`, image);
    } else {
      formData.append(`file`, image.file);
    }
  });
  if (!formData.has('originImages')) {
    formData.append(`originImages`, '');
  }
  if (!formData.has('file')) {
    formData.append(`file`, '');
  }

  const response = await axiosClient.patch(
    `/stores/admins/basic-information/${params.shopId}`,
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
  static getSpaceList = async (shopId: number | null): Promise<SpaceType[]> => {
    const response = await axiosClient.get(
      `${this.apiPrefix}/spaces/${shopId}`,
    );
    return response.data.result;
  };

  // 스페이스별 가게 형태 조회
  static getLayout = async (
    spaceId: number,
  ): Promise<GetShopLayoutResponse> => {
    const response = await axiosClient.get(`/stores/spaces/seats/${spaceId}`);
    return response.data.result;
  };

  // 스페이스 생성
  static createShopLayout = async (
    shopId: number,
    layout: ShopLayout,
  ): Promise<number> => {
    const response = await axiosClient.post(
      `${this.apiPrefix}/spaces/${shopId}`,
      layout,
    );
    return response.data.result.storeSpaceId;
  };

  // 스페이스 삭제
  static deleteSpace = async (spaceId: number) => {
    await axiosClient.delete(`${this.apiPrefix}/spaces/${spaceId}`);
  };

  static editShopLayout = async ({
    spaceId,
    layout,
  }: EditShopLayoutRequest) => {
    const response = await axiosClient.patch(
      `${this.apiPrefix}/spaces/${spaceId}`,
      layout,
    );
    return response;
  };
}
