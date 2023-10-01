import { useInfiniteQuery } from '@tanstack/react-query';
import type {
  ReservationResponseType,
  ReservationStatus,
} from 'api/lib/reservations';
import type { AxiosError } from 'axios';
import { getReservations } from 'api/lib/reservations';
import { queryKeys } from 'common/utils/constants';

export const useGetReservations = (shopId: number, type: ReservationStatus) => {
  return useInfiniteQuery<ReservationResponseType, AxiosError>({
    queryKey: [queryKeys.GET_RESERVATIONS, { shopId, type }],
    queryFn: ({ pageParam = 1 }) =>
      getReservations({ page: pageParam, shopId, reservationStatus: type }),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.hasNext) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
