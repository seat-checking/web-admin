import { useQuery } from '@tanstack/react-query';
import { getCurrentlyInUse } from 'api/shop';
import { queryKeys } from 'common/utils/constants';

export const useGetCurrentlyInUse = (spaceId: number) => {
  return useQuery({
    queryKey: [queryKeys.GET_CURRENTLY_IN_USE, spaceId],
    queryFn: () => getCurrentlyInUse(spaceId),
    enabled: spaceId >= 0,
  });
};
