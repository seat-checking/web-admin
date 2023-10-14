import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditShopLayoutRequest } from 'api/shop/types';
import { ShopApi } from 'api/shop';
import { useSelectedShop } from 'common/stores/authStore';
import { queryKeys } from 'common/utils/constants';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

export const useEditLayout = () => {
  const queryClient = useQueryClient();
  const { setChange } = useChange();
  const { storeId: shopId } = useSelectedShop();

  return useMutation({
    mutationFn: ({ spaceId, layout }: EditShopLayoutRequest) => {
      return ShopApi.editShopLayout({ spaceId, layout });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_SPACES, shopId],
      });
      setChange(false);
    },
  });
};
