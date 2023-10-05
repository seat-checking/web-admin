import { useQuery } from '@tanstack/react-query';
import { getShopInformation } from 'api/shop';
import { queryKeys } from 'common/utils/constants';

export const useGetShopInformation = () => {
  return useQuery({
    queryKey: [queryKeys.GET_SHOP_INFORMATION],
    queryFn: getShopInformation,
  });
};
