import { useMutation } from '@tanstack/react-query';
import { ShopApi } from 'api/lib/shop';

export const useDeleteSpace = () => {
  return useMutation({
    mutationFn: (spaceId: number) => {
      return ShopApi.deleteSpace(spaceId);
    },
  });
};
