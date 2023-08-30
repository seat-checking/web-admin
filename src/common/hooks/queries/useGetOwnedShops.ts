import { useQuery } from '@tanstack/react-query';
import { getOwnedShops } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';

export const useGetOwnedShops = (isDropdownOpen: boolean) => {
  return useQuery({
    queryKey: [queryKeys.GET_OWNED_SHOPS],
    queryFn: getOwnedShops,
    enabled: isDropdownOpen,
    staleTime: Infinity,
  });
};
