import { useEffect, useRef, useState } from 'react';
import { ReactComponent as AlertCircleBorderIcon } from 'assets/icons/alert-circle-border.svg';
import { ReactComponent as PlusCircle } from 'assets/icons/plus-circle.svg';

import { ExitConfirmModal } from 'pages/LayoutSettingPage/components/ExitConfirmModal';
import { Space } from 'pages/LayoutSettingPage/components/Space';
import { SpaceAddEditModal } from 'pages/LayoutSettingPage/components/SpaceAddEditModal';
import {
  AddRow,
  AddText,
  BoldText,
  ChairCountText,
  SpaceHelperWrap,
  SpaceInfoWrap,
  SpaceWrap,
} from 'pages/LayoutSettingPage/components/SpaceRow.styled';

import { useSpace } from 'pages/LayoutSettingPage/hooks/useSpace';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChairCount } from 'pages/LayoutSettingPage/stores/chairCountStore';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';
import { useModal } from 'pages/LayoutSettingPage/stores/modalStore';

/**
 * space 목록 컴포넌트 (검은색 영역)
 */
export const SpaceRow: React.FC = () => {
  const { setSpaceId, spaceId, setFirstSpaceId } = useSpaceId();
  const { isChanged } = useChange();
  const { setIsAddOn, isAddOn } = useModal();
  const [isAddConfirmModalOn, setIsAddConfirmModalOn] = useState(false);
  const [isChangeConfirmModalOn, setIsChangeConfirmModalOn] = useState(false);
  const [clickedSpaceId, setClickedSpaceId] = useState(-1);

  const { spaceList, isLoading, addSpace, editSpace, clearSpaces } = useSpace();

  const chairCount = useChairCount();

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
    if (spaceList == null || firstLoadedRef.current) {
      return;
    }
    setFirstSpaceId();
    firstLoadedRef.current = true;

    if (spaceList?.length === 0) {
      setIsAddOn(true);
    }
  }, [spaceList, setFirstSpaceId, setIsAddOn]);

  return (
    <>
      <SpaceInfoWrap>
        <SpaceHelperWrap>
          <AlertCircleBorderIcon />
          <BoldText>스페이스란?</BoldText> 가게의 방이나 분리된 공간을 의미해요.
        </SpaceHelperWrap>
        <ChairCountText>해당 스페이스 좌석 수 : {chairCount}개</ChairCountText>
      </SpaceInfoWrap>
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
                clearSpaces={clearSpaces}
              />
            ))}
        {isChangeConfirmModalOn && (
          <ExitConfirmModal
            onClose={() => setIsChangeConfirmModalOn(false)}
            clearSpaces={clearSpaces}
            onComplete={() => {
              handleChangeSpaceId(clickedSpaceId);
            }}
          />
        )}
        <AddRow onClick={handleAddSpace}>
          <PlusCircle stroke='white' />
          <AddText>스페이스 추가</AddText>
          {isAddConfirmModalOn && (
            <ExitConfirmModal
              clearSpaces={clearSpaces}
              onComplete={() => {
                clearSpaces();
                setIsAddOn(true);
              }}
              onClose={() => setIsAddConfirmModalOn(false)}
            />
          )}
        </AddRow>
        {isAddOn && (
          <SpaceAddEditModal
            onClose={handleAddModalClose}
            addSpace={addSpace}
            type='CREATE'
          />
        )}
      </SpaceWrap>
    </>
  );
};
