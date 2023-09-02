import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditShopRequest } from 'api/lib/shop';
import { ShopApi } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';

export const useEditLayout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ spaceId, layout }: EditShopRequest) => {
      return ShopApi.editShopLayout({ spaceId, layout });
    },
    onSuccess(_, variables: EditShopRequest) {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_SPACE_LAYOUT, variables],
      });
    },
  });
};
