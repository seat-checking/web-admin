import { useEffect, useRef, useState } from 'react';
import { ReactComponent as AlertCircleBorderIcon } from 'assets/icons/alert-circle-border.svg';
import { ReactComponent as PlusCircle } from 'assets/icons/plus-circle.svg';

import { useGetSpaces } from 'common/hooks/queries/useGetSpaces';
import { TEMPORARY_SPACE_ID } from 'common/utils/constants';
import { ExitConfirmModal } from 'pages/LayoutSettingPage/components/ExitConfirmModal';
import { Space } from 'pages/LayoutSettingPage/components/Space';
import { SpaceInfoModal } from 'pages/LayoutSettingPage/components/SpaceInfoModal';
import {
  AddRow,
  AddText,
  BoldText,
  InfoWrap,
  SpaceWrap,
} from 'pages/LayoutSettingPage/components/SpaceRow.styled';

import { useSpace } from 'pages/LayoutSettingPage/hooks/useSpace';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';
import { useModal } from 'pages/LayoutSettingPage/stores/modalStore';

/**
 * space 목록 컴포넌트 (검은색 영역)
 */
export const SpaceRow: React.FC = () => {
  const { setSpaceId, spaceId } = useSpaceId();
  const { isChanged } = useChange();
  const { setIsAddOn, isAddOn } = useModal();
  const [isAddConfirmModalOn, setIsAddConfirmModalOn] = useState(false);
  const [isChangeConfirmModalOn, setIsChangeConfirmModalOn] = useState(false);
  const [clickedSpaceId, setClickedSpaceId] = useState(-1);

  const { spaceList, isLoading, addSpace, editSpace, clear } = useSpace();

  const firstLoadedRef = useRef(false);

  const handleAddModalClose = () => {
    setIsAddOn(false);
  };

  const handleAddSpace = () => {
    if (isChanged) {
      setIsAddConfirmModalOn(true);
      return;
    }
    setIsAddOn(true);
  };

  const handleChangeSpaceId = (id: number) => {
    setSpaceId(id);
  };

  const handleClickSpace = (id: number) => {
    setClickedSpaceId(id);
    if (id === spaceId) {
      return;
    }
    if (isChanged) {
      setIsChangeConfirmModalOn(true);
      return;
    }
    handleChangeSpaceId(id);
  };

  useEffect(() => {
    if (!spaceList || spaceList?.length === 0) {
      setSpaceId(TEMPORARY_SPACE_ID);
      return;
    }
    if (!firstLoadedRef.current) {
      setSpaceId(spaceList[0].storeSpaceId);
      firstLoadedRef.current = true;
    }
  }, [spaceList]);

  return (
    <>
      <InfoWrap>
        <AlertCircleBorderIcon />
        <BoldText>스페이스란?</BoldText> 가게의 방이나 분리된 공간을 의미해요.
      </InfoWrap>
      <SpaceWrap>
        {isLoading
          ? 'loading..'
          : spaceList?.map((space) => (
              <Space
                key={space.storeSpaceId}
                id={space.storeSpaceId}
                name={space.name}
                onClick={() => handleClickSpace(space.storeSpaceId)}
                editSpace={editSpace}
                // isSelected={space.storeSpaceId === selected}
                // deleteSpace={deleteSpace}
              />
            ))}
        {isChangeConfirmModalOn && (
          <ExitConfirmModal
            onClose={() => setIsChangeConfirmModalOn(false)}
            onComplete={() => {
              clear();
              handleChangeSpaceId(clickedSpaceId);
            }}
          />
        )}
        <AddRow onClick={handleAddSpace}>
          <PlusCircle stroke='white' />
          <AddText>스페이스 추가</AddText>
          {isAddConfirmModalOn && (
            <ExitConfirmModal
              onComplete={() => {
                clear();
                setIsAddOn(true);
              }}
              onClose={() => setIsAddConfirmModalOn(false)}
            />
          )}
        </AddRow>
        {isAddOn && (
          <SpaceInfoModal
            onClose={handleAddModalClose}
            addSpace={addSpace}
            type='CREATE'
          />
        )}
      </SpaceWrap>
    </>
  );
};
