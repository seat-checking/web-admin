import { axiosClient } from 'api/apiClient';

const apiPrefix = '/reservations/admins';
const storeId = localStorage.getItem('storeId');

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

export type ReservationStatus = 'processed' | 'pending' | 'all';

export interface ReservationsRequest {
  page: number;
  reservationStatus: ReservationStatus;
}

export interface ProcessReservationRequest {
  reservationId: number;
  isApproved: boolean;
}

export const processReservation = async ({
  reservationId,
  isApproved,
}: ProcessReservationRequest) => {
  const response = await axiosClient.post(
    `${apiPrefix}/${storeId}/${
      isApproved ? 'approve' : 'reject'
    }/?reservation-id=${reservationId}`,
  );
  return response.data;
};

export const getReservations = async ({
  page = 1,
  reservationStatus,
}: ReservationsRequest): Promise<ReservationResponse> => {
  const response = await axiosClient.get(
    `${apiPrefix}/${storeId}/${reservationStatus}-list`,
    {
      params: {
        page,
        size: 15,
        sort: 'asc',
      },
    },
  );
  if (response.status === 204) {
    return {
      content: [],
      page: 1,
      size: 1,
      hasNext: false,
    };
  }

  return response.data.result;
};
