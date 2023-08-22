import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { TEMPORARY_SPACE_ID, queryKeys } from 'common/utils/constants';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

export const useSpaceId = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { setChange } = useChange();
  const spaceId = Number(searchParams.get('space'));

  const setSpaceId = useCallback((id: number) => {
    setSearchParams({
      space: String(id),
    });
  }, []);

  const setFirstSpaceId = useCallback(() => {
    const spacesList: SpaceType[] | undefined = queryClient.getQueryData([
      queryKeys.GET_SPACES,
    ]);
    if (spacesList?.length === 0) {
      setSpaceId(TEMPORARY_SPACE_ID);
    }
    if (spacesList && spacesList.length > 0) {
      setSpaceId(spacesList[0].storeSpaceId);
    }
    setChange(false);
  }, [queryClient, setSpaceId]);

  return { spaceId, setSpaceId, setFirstSpaceId };
};
