import { axiosClient } from 'api/apiClient';

const apiPrefix = '/reservations/admins';
const storeId = localStorage.getItem('storeId');

export interface Reservation {
  id: number;
  name: string;
  reservationStatus: string; // 거절 취소
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

export const getReservations = async ({
  page = 1,
  reservationStatus,
}: ReservationsRequest): Promise<ReservationResponse> => {
  // const response = await axiosClient.get(`${apiPrefix}/${storeId}/all-list`, {
  //   params: {
  //     page,
  //     size: 15,
  //     sort: 'asc',
  //   },
  // });
  const response = await axiosClient.get(
    `${apiPrefix}/${storeId}/${reservationStatus}-list?page=${page}`,
  );
  console.log('response :>> ', response);
  if (response.status === 204) {
    console.log('204');
    return {
      content: [],
      page: 1,
      size: 1,
      hasNext: false,
    };
  }

  return response.data.result;
};
