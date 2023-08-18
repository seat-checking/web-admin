import { useMutation } from '@tanstack/react-query';
import type { ShopInfoForm } from 'common/utils/types';
import { addShop } from 'api/lib/shop';

export const useAddShop = () => {
  return useMutation({
    mutationFn: (shopInfoForm: ShopInfoForm) => {
      return addShop(shopInfoForm);
    },
  });
};
