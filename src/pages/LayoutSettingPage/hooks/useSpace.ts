import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { TEMPORARY_SPACE_ID, queryKeys } from 'common/utils/constants';

export interface UseSpaceReturn {
  spaceList: SpaceType[];
  setSpaces: (space: SpaceType[]) => void;
  addSpace: () => void;
  deleteSpace: (id: number) => void;
  setSelectedSpace: (id: number) => void;
  selected: number;
}

export const useSpace = (): UseSpaceReturn => {
  const [spaceList, setSpaceList] = useState<SpaceType[]>([]);
  const [selected, setSelected] = useState(spaceList?.[0]?.storeSpaceId);
  const [searchParams, setSearchParmas] = useSearchParams();

  const queryClient = useQueryClient();
  const setSelectedSpace = (id: number) => {
    setSelected(id);
  };

  const setSpaces = useCallback((space: SpaceType[]) => {
    setSpaceList(space);
  }, []);

  const addSpace = useCallback(() => {
    // const newId = Date.now();
    const newId = TEMPORARY_SPACE_ID;
    const newSpace: SpaceType = {
      storeSpaceId: newId,
      storeSpaceName: 'Space',
    };
    setSearchParmas({ space: String(newId) });
    setSpaceList([...spaceList, newSpace]);
    queryClient.setQueryData([queryKeys.GET_SPACES], (data: any) => {
      console.log('data :>> ', data);
      return [...data, newSpace];
    });
  }, [spaceList]);

  const deleteSpace = useCallback(
    (id: number) => {
      const deleted = spaceList.filter((space) => space.storeSpaceId !== id);
      setSpaceList(deleted);
    },
    [spaceList],
  );

  return {
    spaceList,
    setSpaces,
    addSpace,
    deleteSpace,
    selected,
    setSelectedSpace,
  };
};
