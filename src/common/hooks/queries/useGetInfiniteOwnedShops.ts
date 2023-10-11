import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DropdownShop } from 'common/utils/types';
import { getInfiniteOwnedShops } from 'api/shop';
import { queryKeys } from 'common/utils/constants';
import { INFINITE_OWNED_SHOPS_PAGE_SIZE } from 'common/utils/types';

export const useGetInfiniteOwnedShops = (isDropdownOpen: boolean) => {
  return useInfiniteQuery<DropdownShop[], AxiosError>({
    queryKey: [queryKeys.GET_OWNED_SHOPS],
    queryFn: ({ pageParam = 1 }) =>
      getInfiniteOwnedShops({
        page: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length >= INFINITE_OWNED_SHOPS_PAGE_SIZE) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: isDropdownOpen,
    staleTime: Infinity,
  });
};
