import { useInfiniteQuery } from '@tanstack/react-query';
import type {
  ReservationResponse,
  ReservationStatus,
} from 'api/lib/reservations';
import type { AxiosError } from 'axios';
import { getReservations } from 'api/lib/reservations';
import { queryKeys } from 'common/utils/constants';

export const useGetReservations = (shopId: number, type: ReservationStatus) => {
  return useInfiniteQuery<ReservationResponse, AxiosError>({
    queryKey: [queryKeys.GET_RESERVATIONS, { shopId, type }],
    queryFn: ({ pageParam = 1 }) =>
      getReservations({ page: pageParam, shopId, reservationStatus: type }),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
