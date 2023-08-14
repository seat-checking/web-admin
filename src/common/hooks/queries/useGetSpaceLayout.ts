import { useQuery } from '@tanstack/react-query';
import { ShopApi } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';

export const useGetSpaceLayout = (spaceId: number) => {
  const shopId = 0;
  console.log('spaceId :>> ', spaceId);
  return useQuery({
    queryKey: [queryKeys.GET_SPACE_LAYOUT, shopId, spaceId],
    queryFn: () => ShopApi.getLayout(shopId, spaceId),
    enabled: typeof spaceId === 'number' && !Number.isNaN(spaceId),
  });
};
