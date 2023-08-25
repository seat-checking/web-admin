import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { useGetSpaces } from 'common/hooks/queries/useGetSpaces';
import { TEMPORARY_SPACE_ID } from 'common/utils/constants';

export interface UseSpaceReturn {
  spaceList: SpaceType[] | undefined;
  setSpaces: (space: SpaceType[]) => void;
  addSpace: (name: string) => void;
  deleteSpace: (id: number) => void;
  editSpace: (id: number, name: string) => void;
  isLoading: boolean;
}

export const useSpace = (): UseSpaceReturn => {
  const { data, isLoading } = useGetSpaces();
  const [spaceList, setSpaceList] = useState<SpaceType[] | undefined>(data);

  useEffect(() => {
    setSpaceList(data);
  }, [data]);

  const [searchParams, setSearchParmas] = useSearchParams();

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
  };
};
