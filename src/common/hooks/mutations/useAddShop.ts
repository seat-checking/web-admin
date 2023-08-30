import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ShopInfoForm } from 'common/utils/types';
import { addShop } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';

export const useAddShop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shopInfoForm: ShopInfoForm) => {
      return addShop(shopInfoForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.GET_OWNED_SHOPS]);
    },
  });
};
