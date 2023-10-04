import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { useSelectedShop } from 'common/stores/authStore';
import { NO_SPACE_ID, queryKeys } from 'common/utils/constants';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

export const useSpaceId = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { storeId: shopId } = useSelectedShop();

  const queryClient = useQueryClient();
  const { setChange } = useChange();
  const spaceId =
    searchParams.get('space') == null
      ? NO_SPACE_ID
      : Number(searchParams.get('space'));

  const setSpaceId = useCallback(
    (id: number) => {
      setSearchParams({
        space: String(id),
      });
    },
    [setSearchParams],
  );

  const setFirstSpaceId = useCallback(() => {
    const spacesList: SpaceType[] | undefined = queryClient.getQueryData([
      queryKeys.GET_SPACES,
      shopId,
    ]);
    if (spacesList?.length === 0) {
      setSearchParams('');
    }
    if (spacesList && spacesList.length > 0) {
      setSpaceId(spacesList[0].storeSpaceId);
    }
    setChange(false);
  }, [queryClient, setSpaceId, setChange, setSearchParams, shopId]);

  return { spaceId, setSpaceId, setFirstSpaceId };
};
