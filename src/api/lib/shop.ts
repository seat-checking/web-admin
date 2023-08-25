import type { DropdownShop, ShopInfoForm } from 'common/utils/types';
import { axiosClient } from 'api/apiClient';

export interface ToggleCloseTodayRequest {
  shopId: number;
  isClosedToday: boolean;
}

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

export const getShopPermission = async (shopId: number): Promise<string> => {
  const response = await axiosClient.get(`/stores/admins/permission/${shopId}`);
  console.log('response.data.result :>> ', response.data.result);
  return response.data.result;
};
