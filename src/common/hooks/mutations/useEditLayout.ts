import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShopApi } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';

export const useEditLayout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (spaceId: number) => {
      return ShopApi.editShopLayout(spaceId);
    },
    onSuccess(_, spaceId: number) {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_SPACE_LAYOUT, spaceId],
      });
    },
  });
};
