import { useMutation } from '@tanstack/react-query';
import type { ProcessReservationRequest } from 'api/lib/reservations';
import { processReservation } from 'api/lib/reservations';

export const useProcessReservation = () => {
  return useMutation({
    mutationFn: (processReservationRequest: ProcessReservationRequest) => {
      return processReservation(processReservationRequest);
    },
  });
};
