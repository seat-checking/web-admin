import { useQueryClient } from '@tanstack/react-query';
import { getShopPermission } from 'api/shop';
import { queryKeys } from 'common/utils/constants';

export const useGetPermission = () => {
  const queryClient = useQueryClient();

  return {
    fetchPermission: (shopId: number) => {
      return queryClient.fetchQuery({
        queryKey: [queryKeys.GET_PERMISSION, shopId],
        queryFn: () => getShopPermission(shopId),
        staleTime: Infinity,
      });
    },
  };
};
