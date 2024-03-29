import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { ShopApi } from 'api/shop';
import { useSelectedShop } from 'common/stores/authStore';
import { queryKeys } from 'common/utils/constants';

export const useDeleteSpace = () => {
  const queryClient = useQueryClient();
  const { storeId: shopId } = useSelectedShop();

  return useMutation({
    mutationFn: (spaceId: number) => {
      return ShopApi.deleteSpace(spaceId);
    },
    onSuccess(_, spaceId: number) {
      queryClient.setQueryData(
        [queryKeys.GET_SPACES, shopId],
        (data: SpaceType[] | undefined) => {
          const filtered = data?.filter(
            (item) => item.storeSpaceId !== spaceId,
          );
          return filtered;
        },
      );
    },
  });
};
