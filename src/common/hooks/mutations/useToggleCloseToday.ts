import { useMutation } from '@tanstack/react-query';
import type { ToggleCloseTodayRequest } from 'api/shop/types';
import { toggleCloseToday } from 'api/shop';

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
