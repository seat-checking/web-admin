import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { ShopInformationForm } from 'common/utils/types';
import { editShopInformation } from 'api/shop';
import { useSelectedShop } from 'common/stores/authStore';

export const useEditShopInformation = () => {
  const { storeId: shopId } = useSelectedShop();

  return useMutation({
    mutationFn: (params: ShopInformationForm) => {
      return editShopInformation({ ...params, shopId });
    },
    onSuccess: () => {
      toast.success('변경사항이 성공적으로 저장되었습니다.');
    },
  });
};
