import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditShopLayout } from 'api/lib/shop';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { ShopApi } from 'api/lib/shop';
import { queryKeys } from 'common/utils/constants';

export const useCreateSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (layout: EditShopLayout) => {
      return ShopApi.createShopLayout(layout);
    },
    onSuccess(data, layout: EditShopLayout) {
      console.log('data :>> ', data);
      // queryClient.setQueryData(
      //   [queryKeys.GET_SPACES],
      //   (data: SpaceType[] | undefined) => {
      //     console.log('data :>> ', data);
      //     const changeId = data?.map((space) =>
      //       space.storeSpaceId === -1
      //         ? { ...space, storeSpaceId: // 새로 넘겨받은 id로 교체  }
      //         : space,
      //     );
      //     return changeId;
      //   },
      // );
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_SPACES],
      });
    },
  });
};
