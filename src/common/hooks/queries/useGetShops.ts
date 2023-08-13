import { useQuery } from '@tanstack/react-query';
import { AuthApi } from 'api/lib/auth';
import { queryKeys } from 'common/utils/constants';

export const useGetShops = () => {
  return useQuery({
    queryKey: [queryKeys.GET_SHOP],
    queryFn: AuthApi.getShops,
  });
};
