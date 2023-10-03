import { useQuery } from '@tanstack/react-query';
import { ShopApi } from 'api/shop';
import { useSelectedShop } from 'common/stores/authStore';
import { queryKeys } from 'common/utils/constants';

export const useGetSpaces = () => {
  const { storeId: shopId } = useSelectedShop();

  return useQuery({
    queryKey: [queryKeys.GET_SPACES, shopId],
    queryFn: () => ShopApi.getSpaceList(shopId),
    enabled: shopId !== null,
    refetchOnWindowFocus: false,
  });
};
