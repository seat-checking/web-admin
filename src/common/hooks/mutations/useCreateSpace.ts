import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ShopLayout } from 'api/lib/shop';
import { ShopApi } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

export const useCreateSpace = () => {
  const queryClient = useQueryClient();
  const { setSpaceId } = useSpaceId();
  const { setChange } = useChange();

  return useMutation({
    mutationFn: (layout: ShopLayout) => {
      return ShopApi.createShopLayout(layout);
    },
    onSuccess(createdSpaceId) {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_SPACES],
      });
      setSpaceId(createdSpaceId);
      setChange(false);
    },
  });
};
