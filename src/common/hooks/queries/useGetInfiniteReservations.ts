import { useInfiniteQuery } from '@tanstack/react-query';
import type {
  ReservationResponseType,
  ReservationStatus,
} from 'api/lib/reservations';
import type { AxiosError } from 'axios';
import { getInfiniteReservations } from 'api/lib/reservations';
import { useSelectedShop } from 'common/stores/authStore';
import { queryKeys } from 'common/utils/constants';

export const useGetInfiniteReservations = (
  shopId: number | null,
  type: ReservationStatus,
) => {
  const { storeId } = useSelectedShop();

  return useInfiniteQuery<ReservationResponseType, AxiosError>({
    queryKey: [queryKeys.GET_INFINITE_RESERVATIONS, { shopId: storeId, type }],
    queryFn: ({ pageParam = 1 }) =>
      getInfiniteReservations({
        page: pageParam,
        shopId: storeId,
        reservationStatus: type,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.hasNext) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: storeId !== null,
  });
};
