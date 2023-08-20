import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { ReactComponent as AlertCircleBorderIcon } from 'assets/icons/alert-circle-border.svg';
import { ReactComponent as PlusCircle } from 'assets/icons/plus-circle.svg';

import { useGetSpaces } from 'common/hooks/queries/useGetSpaces';
import { TEMPORARY_SPACE_ID } from 'common/utils/constants';
import { Space } from 'pages/LayoutSettingPage/components/Space';
import { SpaceInfoModal } from 'pages/LayoutSettingPage/components/SpaceInfoModal';
import {
  AddRow,
  AddText,
  BoldText,
  InfoWrap,
  SpaceWrap,
} from 'pages/LayoutSettingPage/components/SpaceRow.styled';

import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';
import { useModal } from 'pages/LayoutSettingPage/stores/modalStore';

/**
 * space 목록 컴포넌트 (검은색 영역)
 */
export const SpaceRow: React.FC = () => {
  const { setSpaceId } = useSpaceId();
  const { isChanged } = useChange();
  const { setIsConfirmOn, setIsAddOn, isAddOn } = useModal();

  const { data: spacesList, isLoading } = useGetSpaces();
  const firstLoadedRef = useRef(false);

  const handleAddModalClose = () => {
    setIsAddOn(false);
  };

  const handleAddSpace = () => {
    if (isChanged) {
      setIsConfirmOn(true);
      return;
    }
    setIsAddOn(true);
  };

  useEffect(() => {
    if (!spacesList || spacesList?.length === 0) {
      setSpaceId(TEMPORARY_SPACE_ID);
      return;
    }
    if (!firstLoadedRef.current) {
      setSpaceId(spacesList[0].storeSpaceId);
      firstLoadedRef.current = true;
    }
  }, [spacesList]);

  return (
    <>
      <InfoWrap>
        <AlertCircleBorderIcon />
        <BoldText>스페이스란?</BoldText> 가게의 방이나 분리된 공간을 의미해요.
      </InfoWrap>
      <SpaceWrap>
        {isLoading
          ? 'loading..'
          : spacesList?.map((space) => (
              <Space
                key={space.storeSpaceId}
                id={space.storeSpaceId}
                name={space.name}
                // onClick={setSelectedSpace}
                // isSelected={space.storeSpaceId === selected}
                // deleteSpace={deleteSpace}
              />
            ))}
        <AddRow onClick={handleAddSpace}>
          <PlusCircle stroke='white' />
          <AddText>스페이스 추가</AddText>
        </AddRow>
        {isAddOn && (
          <SpaceInfoModal onClose={handleAddModalClose} type='CREATE' />
        )}
      </SpaceWrap>
    </>
  );
};
