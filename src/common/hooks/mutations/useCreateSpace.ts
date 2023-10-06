import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ShopLayout } from 'api/shop/types';
import { ShopApi } from 'api/shop';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

export const useCreateSpace = () => {
  const { setSpaceId } = useSpaceId();
  const { setChange } = useChange();

  return useMutation({
    mutationFn: ({
      layout,
      shopId,
    }: {
      layout: ShopLayout;
      shopId: number;
    }) => {
      return ShopApi.createShopLayout(shopId, layout);
    },
    onSuccess(createdSpaceId) {
      setSpaceId(createdSpaceId);
      setChange(false);
    },
  });
};
