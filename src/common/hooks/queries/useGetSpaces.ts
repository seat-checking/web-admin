import { useQuery } from '@tanstack/react-query';
import { ShopApi } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';

export const useGetSpaces = () => {
  return useQuery({
    queryKey: [queryKeys.GET_SPACES],
    queryFn: ShopApi.getSpaceList,
    refetchOnWindowFocus: false,
  });
};
