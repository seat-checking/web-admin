import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { SpaceWrap } from 'pages/LayoutSettingPage/components/SpaceRow.styled';
import { SpaceItem } from 'pages/ShopStatusPage/ShopContent/components/SpaceItem';

interface SpaceListProps {
  spaceList: SpaceType[] | undefined;
  isLoading: boolean;
  currentSpaceId: number | null;
  onChangeSpace: (spaceId: number) => void;
}

/**
 * 스페이스 목록 영역
 */
export const SpaceList: React.FC<SpaceListProps> = ({
  spaceList,
  isLoading,
  onChangeSpace,
  currentSpaceId,
}) => {
  return (
    <SpaceWrap>
      {isLoading
        ? 'loading..'
        : spaceList?.map((space) => (
            <SpaceItem
              key={space.storeSpaceId}
              name={space.name}
              isSelected={space.storeSpaceId === currentSpaceId}
              onSelect={() => onChangeSpace(space.storeSpaceId)}
            />
          ))}
    </SpaceWrap>
  );
};
