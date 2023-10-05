import { useQuery } from '@tanstack/react-query';
import { getShopInformation } from 'api/shop';
import { useSelectedShop } from 'common/stores/authStore';
import { queryKeys } from 'common/utils/constants';

export const useGetShopInformation = () => {
  const { storeId: shopId } = useSelectedShop();

  return useQuery({
    queryKey: [queryKeys.GET_SHOP_INFORMATION, shopId],
    queryFn: () => getShopInformation(shopId),
    enabled: shopId !== null,
  });
};
