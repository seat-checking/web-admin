import { axiosClient } from 'api/apiClient';

const apiPrefix = '/reservations/admins';

export type ReservationStatusType = '거절' | '취소' | '대기' | '승인';
export interface Reservation {
  id: number;
  name: string;
  reservationStatus: ReservationStatusType;
  storeSpaceName: string; // 공간이름
  reservationUnitReservedByUser: '좌석' | '스페이스';
  reservedPlace: string;
  startSchedule: string;
  endSchedule: string;
  createdAt: string;
}

export interface ReservationResponse {
  content: Reservation[];
  page: number;
  size: number;
  hasNext: boolean;
}
export type ReservationResponseType = ReservationResponse | null;

export type ReservationStatus = 'processed' | 'pending' | 'all';

export interface ReservationsRequest {
  page: number;
  reservationStatus: ReservationStatus;
  shopId: number | null;
}

export interface ProcessReservationRequest {
  reservationId: number;
  isApproved: boolean;
  shopId: number | null;
}

export const processReservation = async ({
  reservationId,
  isApproved,
  shopId,
}: ProcessReservationRequest) => {
  const response = await axiosClient.post(
    `${apiPrefix}/${shopId}/${
      isApproved ? 'approve' : 'reject'
    }/?reservation-id=${reservationId}`,
  );
  return response.data;
};

export const getInfiniteReservations = async ({
  page = 1,
  reservationStatus,
  shopId,
}: ReservationsRequest): Promise<ReservationResponseType> => {
  const response = await axiosClient.get(
    `${apiPrefix}/${shopId}/${reservationStatus}-list`,
    {
      params: {
        page,
        size: 15,
        sort: 'asc',
      },
    },
  );
  if (response.status === 204) {
    return null;
  }

  return response.data.result;
};

export const forceCheckout = async (chairId: number) => {
  const response = await axiosClient.post(
    `/utilization/admins/forced_check_out/${chairId}`,
    {
      params: {
        'utilization-id': chairId,
      },
    },
  );
  return response.data;
};
