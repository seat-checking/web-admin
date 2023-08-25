import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { useGetSpaces } from 'common/hooks/queries/useGetSpaces';
import { TEMPORARY_SPACE_ID, queryKeys } from 'common/utils/constants';

export interface UseSpaceReturn {
  spaceList: SpaceType[] | undefined;
  setSpaces: (space: SpaceType[]) => void;
  addSpace: (name: string) => void;
  deleteSpace: (id: number) => void;
  editSpace: (id: number, name: string) => void;
  isLoading: boolean;
  clear: () => void;
}

export const useSpace = (): UseSpaceReturn => {
  const { data, isLoading } = useGetSpaces();
  const [spaceList, setSpaceList] = useState<SpaceType[] | undefined>(data);
  const queryClient = useQueryClient();

  useEffect(() => {
    setSpaceList(data);
  }, [data]);

  const [searchParams, setSearchParmas] = useSearchParams();

  const clear = useCallback(() => {
    const cached = queryClient.getQueryData([
      queryKeys.GET_SPACES,
    ]) as SpaceType[];
    setSpaceList(cached);
  }, [queryClient]);

  const setSpaces = useCallback((space: SpaceType[]) => {
    setSpaceList(space);
  }, []);

  const addSpace = useCallback(
    (name: string) => {
      const newId = TEMPORARY_SPACE_ID;
      const newSpace: SpaceType = {
        storeSpaceId: newId,
        name,
      };
      setSearchParmas({ space: String(newId) });

      if (spaceList) {
        setSpaces([...spaceList, newSpace]);
      } else {
        setSpaces([newSpace]);
      }
    },
    [setSpaces, spaceList, setSearchParmas],
  );

  const editSpace = useCallback(
    (id: number, name: string) => {
      const changedSpaceList = spaceList?.map((space: SpaceType) =>
        space.storeSpaceId === id ? { ...space, name } : space,
      );
      setSpaceList(changedSpaceList);
    },
    [spaceList],
  );

  const deleteSpace = useCallback(
    (id: number) => {
      const deleted = spaceList?.filter((space) => space.storeSpaceId !== id);
      setSpaceList(deleted);
    },
    [spaceList],
  );

  return {
    spaceList,
    setSpaces,
    addSpace,
    deleteSpace,
    editSpace,
    isLoading,
    clear,
  };
};
