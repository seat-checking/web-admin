import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { EditShopInformationRequest } from 'api/shop/types';
import { editShopInformation } from 'api/shop';
import { queryKeys } from 'common/utils/constants';

export const useEditShopInformation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: EditShopInformationRequest) => {
      return editShopInformation({ ...params });
    },
    onSuccess: (_, { shopId: usedShopId }) => {
      toast.success('변경사항이 성공적으로 저장되었습니다.');
      queryClient.invalidateQueries([
        queryKeys.GET_SHOP_INFORMATION,
        usedShopId,
      ]);
    },
  });
};
