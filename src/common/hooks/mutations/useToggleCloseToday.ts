import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ToggleCloseTodayRequest } from 'api/lib/shop';
import type { DropdownShop } from 'common/utils/types';
import { toggleCloseToday } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';

export const useToggleCloseToday = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, isClosedToday }: ToggleCloseTodayRequest) => {
      return toggleCloseToday({
        shopId,
        isClosedToday,
      });
    },
    onSuccess(_, { shopId, isClosedToday }) {
      queryClient.setQueryData(
        [queryKeys.GET_OWNED_SHOPS],
        (data: DropdownShop[] | undefined) => {
          return data?.map((shop) => {
            if (shop.storeId === shopId) {
              const changedShop = { ...shop, isClosedToday };
              if (!isClosedToday) {
                changedShop.isOpenNow = false;
              }
              return changedShop;
            }
            return shop;
          });
        },
      );
    },
  });
};
