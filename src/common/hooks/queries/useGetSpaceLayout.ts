import { useQuery } from '@tanstack/react-query';
import { ShopApi } from 'api/shop';
import { queryKeys } from 'common/utils/constants';

export const useGetSpaceLayout = (spaceId: number) => {
  return useQuery({
    queryKey: [queryKeys.GET_SPACE_LAYOUT, spaceId],
    queryFn: () => ShopApi.getLayout(spaceId),
    enabled:
      typeof spaceId === 'number' && !Number.isNaN(spaceId) && spaceId >= 0,
    refetchOnWindowFocus: false,
  });
};
