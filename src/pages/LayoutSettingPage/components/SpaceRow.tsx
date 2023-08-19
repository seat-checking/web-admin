import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { ReactComponent as AlertCircleBorderIcon } from 'assets/icons/alert-circle-border.svg';
import { ReactComponent as PlusCircle } from 'assets/icons/plus-circle.svg';

import { useGetSpaces } from 'common/hooks/queries/useGetSpaces';
import { queryKeys } from 'common/utils/constants';
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
  const { addSpace, deleteSpace, selected, setSelectedSpace, setSpaces } =
    useSpace();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const loaded = useLoaderData() as SpaceType[];

  const spacesList: SpaceType[] | undefined = queryClient.getQueryData([
    queryKeys.GET_SPACES,
  ]);

  useEffect(() => {
    queryClient.setQueryData([queryKeys.GET_SPACES], loaded);

    setSearchParams({ space: String(loaded?.[0]?.storeSpaceId) });
  }, []);

  return (
    <>
      <InfoWrap>
        <AlertCircleBorderIcon />
        <BoldText>스페이스란?</BoldText> 가게의 방이나 분리된 공간을 의미해요.
      </InfoWrap>
      <SpaceWrap>
        {spacesList?.map((space) => (
          <Space
            key={space.storeSpaceId}
            id={space.storeSpaceId}
            name={space.name}
            // onClick={setSelectedSpace}
            // isSelected={space.storeSpaceId === selected}
            // deleteSpace={deleteSpace}
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
