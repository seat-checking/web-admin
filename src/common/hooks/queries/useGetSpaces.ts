import { useQuery } from '@tanstack/react-query';
import { ShopApi } from 'api/shop';
import { queryKeys } from 'common/utils/constants';

export const useGetSpaces = (shopId: number | null) => {
  return useQuery({
    queryKey: [queryKeys.GET_SPACES, shopId],
    queryFn: () => ShopApi.getSpaceList(shopId),
    enabled: shopId !== null,
    refetchOnWindowFocus: false,
  });
};
