import { useMutation } from '@tanstack/react-query';
import type { ToggleCloseTodayRequest } from 'api/lib/shop';
import { toggleCloseToday } from 'api/lib/shop';

export const useToggleCloseToday = () => {
  return useMutation({
    mutationFn: ({ shopId, isClosedToday }: ToggleCloseTodayRequest) => {
      return toggleCloseToday({
        shopId,
        isClosedToday,
      });
    },
  });
};
