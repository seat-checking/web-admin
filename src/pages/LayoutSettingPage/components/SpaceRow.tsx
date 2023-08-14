import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as AlertCircleBorderIcon } from 'assets/icons/alert-circle-border.svg';
import { ReactComponent as PlusCircle } from 'assets/icons/plus-circle.svg';

import { useGetSpaces } from 'common/hooks/queries/useGetSpaces';
import { Space } from 'pages/LayoutSettingPage/components/Space';
import {
  AddRow,
  AddText,
  BoldText,
  InfoWrap,
  SpaceWrap,
} from 'pages/LayoutSettingPage/components/SpaceRow.styled';
import { useSpace } from 'pages/LayoutSettingPage/hooks/useSpace';

/**
 * space 목록 컴포넌트 (검은색 영역)
 */
export const SpaceRow: React.FC = () => {
  const {
    spaceList,
    addSpace,
    deleteSpace,
    selected,
    setSelectedSpace,
    setSpaces,
  } = useSpace();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: spacesList, isLoading } = useGetSpaces();

  useEffect(() => {
    console.log(
      'spacesList?.[0]?.storeSpaceId :>> ',
      spacesList?.[0]?.storeSpaceId,
    );
    setSearchParams({ space: spacesList?.[0]?.storeSpaceId });
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <InfoWrap>
        <AlertCircleBorderIcon />
        <BoldText>스페이스란?</BoldText> 가게의 방이나 분리된 공간을 의미해요.
      </InfoWrap>
      <SpaceWrap>
        {spacesList?.map((space: any) => (
          <Space
            key={space.storeSpaceId}
            id={space.storeSpaceId}
            name={space.storeSpaceName}
            // onClick={setSelectedSpace}
            // isSelected={space.storeSpaceId === selected}
            deleteSpace={deleteSpace}
          />
        ))}
        <AddRow onClick={addSpace}>
          <PlusCircle stroke='white' />
          <AddText>스페이스 추가</AddText>
        </AddRow>
      </SpaceWrap>
    </>
  );
};
