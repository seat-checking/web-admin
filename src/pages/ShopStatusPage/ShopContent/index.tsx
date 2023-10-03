import { useEffect, useState } from 'react';
import { useGetSpaceLayout } from 'common/hooks/queries/useGetSpaceLayout';
import { useGetSpaces } from 'common/hooks/queries/useGetSpaces';
import { ShopLayout } from 'pages/ShopStatusPage/ShopContent/components/ShopLayout';
import { SpaceList } from 'pages/ShopStatusPage/ShopContent/components/SpaceList';

/**
 * 가게 현황 페이지의 오른쪽 영역
 */

export const ShopContent: React.FC = () => {
  const { data: spaceList, isLoading: isSpaceListLoading } = useGetSpaces();
  const [currentSpaceId, setCurrentSpaceId] = useState<number>(-1);

  const { data: layout, isLoading: isLayoutLoading } =
    useGetSpaceLayout(currentSpaceId);
  console.log('layout :>> ', layout);

  const handleChangeSpace = (spaceId: number) => {
    setCurrentSpaceId(spaceId);
  };

  useEffect(() => {
    if (!spaceList || spaceList.length === 0) {
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
      <ShopLayout isLoading={isLayoutLoading} layout={layout} />
    </>
  );
};
