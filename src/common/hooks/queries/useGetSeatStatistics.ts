import { useQuery } from '@tanstack/react-query';
import { getSeatStatistics } from 'api/shop';
import { useSelectedShop } from 'common/stores/authStore';
import { queryKeys } from 'common/utils/constants';

export const useGetSeatStatistics = () => {
  const { storeId: shopId } = useSelectedShop();

  return useQuery({
    queryKey: [queryKeys.GET_SEAT_STATISTICS, shopId],
    queryFn: () => getSeatStatistics(shopId),
    refetchOnWindowFocus: false,
  });
};
