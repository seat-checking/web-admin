import { useCallback, useState } from 'react';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';

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
  const [selected, setSelected] = useState(spaceList?.[0]?.id);

  const setSelectedSpace = (id: number) => {
    setSelected(id);
  };

  const setSpaces = useCallback((space: SpaceType[]) => {
    setSpaceList(space);
  }, []);

  const addSpace = useCallback(() => {
    const newSpace: SpaceType = {
      id: Date.now(),
      name: 'Space',
    };
    setSpaceList([...spaceList, newSpace]);
  }, [spaceList]);

  const deleteSpace = useCallback(
    (id: number) => {
      const deleted = spaceList.filter((space) => space.id !== id);
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
