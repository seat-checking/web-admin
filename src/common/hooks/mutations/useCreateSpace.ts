import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateShopLayout } from 'api/lib/shop';
import { ShopApi } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

export const useCreateSpace = () => {
  const queryClient = useQueryClient();
  const { setSpaceId } = useSpaceId();
  const { setChange } = useChange();

  return useMutation({
    mutationFn: (layout: CreateShopLayout) => {
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
