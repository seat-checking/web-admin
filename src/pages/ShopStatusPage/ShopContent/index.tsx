import { useEffect, useState } from 'react';
import type { CurrentlyInUseResponse } from 'api/shop/types';

import { useGetCurrentlyInUse } from 'common/hooks/queries/useGetCurrentlyInUse';
import { useGetSpaces } from 'common/hooks/queries/useGetSpaces';
import { ShopLayout } from 'pages/ShopStatusPage/ShopContent/components/ShopLayout';
import { SpaceList } from 'pages/ShopStatusPage/ShopContent/components/SpaceList';

const inUse: CurrentlyInUseResponse = {
  isThisSpaceCurrentlyInUse: false,
  isThisSpaceCurrentlyHolding: false,
  allChairsCurrentlyInUse: [
    {
      id: 337,
    },
    {
      id: 338,
    },
  ],
  allChairsCurrentlyHolding: [
    {
      id: 0,
    },
  ],
};
/**
 * 가게 현황 페이지의 오른쪽 영역
 */

export const ShopContent: React.FC = () => {
  const { data: spaceList, isLoading: isSpaceListLoading } = useGetSpaces();
  const [currentSpaceId, setCurrentSpaceId] = useState<number>(-1);

  // TODO: api 500 해결 후  수정 예정
  // const { data: currentlyInUse } = useGetCurrentlyInUse(currentSpaceId);
  const handleChangeSpace = (spaceId: number) => {
    setCurrentSpaceId(spaceId);
  };

  useEffect(() => {
    if (!spaceList) {
      return;
    }
    if (spaceList.length === 0) {
      setCurrentSpaceId(-1);
      return;
    }
    setCurrentSpaceId(spaceList[0].storeSpaceId);
  }, [spaceList]);

  return (
    <>
      <SpaceList
        spaceList={spaceList}
        isLoading={isSpaceListLoading}
        currentSpaceId={currentSpaceId}
        onChangeSpace={handleChangeSpace}
      />
      <ShopLayout currentSpaceId={currentSpaceId} inUse={inUse} />
    </>
  );
};
