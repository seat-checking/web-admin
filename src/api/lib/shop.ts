import type { ShopInfoForm } from 'common/utils/types';
import { axiosClient } from 'api/apiClient';

export const addShop = async (shopInfoForm: ShopInfoForm) => {
  const response = await axiosClient.post(
    '/stores/admins/new-business-information',
    shopInfoForm,
  );
  return response.data.result;
};

export const getOwnedShops = async () => {
  const response = await axiosClient.get('/stores/admins/owned');
  return response.data.result;
};
