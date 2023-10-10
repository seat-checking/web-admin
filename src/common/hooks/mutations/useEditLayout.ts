import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditShopLayoutRequest } from 'api/shop/types';
import { ShopApi } from 'api/shop';
import { queryKeys } from 'common/utils/constants';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

export const useEditLayout = () => {
  const queryClient = useQueryClient();
  const { setChange } = useChange();

  return useMutation({
    mutationFn: ({ spaceId, layout }: EditShopLayoutRequest) => {
      return ShopApi.editShopLayout({ spaceId, layout });
    },
    onSuccess(_, { spaceId, layout }) {
      queryClient.setQueryData([queryKeys.GET_SPACE_LAYOUT, spaceId], {
        storeSpaceId: spaceId,
        ...layout,
      });
      setChange(false);
    },
  });
};
