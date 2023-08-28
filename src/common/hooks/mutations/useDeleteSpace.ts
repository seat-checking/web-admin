import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { ShopApi } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';

export const useDeleteSpace = () => {
  const queryClient = useQueryClient();
  const { setFirstSpaceId } = useSpaceId();

  return useMutation({
    mutationFn: (spaceId: number) => {
      return ShopApi.deleteSpace(spaceId);
    },
    onSuccess(_, spaceId: number) {
      queryClient.setQueryData(
        [queryKeys.GET_SPACES],
        (data: SpaceType[] | undefined) => {
          const filtered = data?.filter(
            (item) => item.storeSpaceId !== spaceId,
          );
          return filtered;
        },
      );
      setFirstSpaceId();
    },
  });
};
