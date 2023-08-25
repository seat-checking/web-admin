import { useState } from 'react';
import styled, { css, useTheme } from 'styled-components/macro';
import { ReactComponent as EditIcon } from 'assets/icons/edit-md.svg';
import { ReactComponent as XIcon } from 'assets/icons/x.svg';

import { IconButton } from 'components/XButton';
import { DeleteSpaceModal } from 'pages/LayoutSettingPage/components/DeleteSpaceModal';
import { SpaceInfoModal } from 'pages/LayoutSettingPage/components/SpaceInfoModal';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { flexSet } from 'styles/mixin';

interface SpaceProps {
  id: number;
  name: string;
  onClick: () => void;
  editSpace: (id: number, name: string) => void;
}

/**
 * Space 컴포넌트 (흰색 네모)
 */
export const Space: React.FC<SpaceProps> = ({
  id,
  name,
  onClick,
  editSpace,
}) => {
  const theme = useTheme();
  const { spaceId } = useSpaceId();

  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);
  const [isEditModalOn, setIsEditModalOn] = useState(false);

  const isSelected = spaceId === id;

  const handleOpenModal = (e: React.MouseEvent, type: 'EDIT' | 'DELETE') => {
    e.preventDefault(); // SpaceBox로 클릭 이벤트 버블링 막기
    if (type === 'DELETE') {
      setIsDeleteModalOn(true);
      return;
    }
    setIsEditModalOn(true);
  };

  return (
    <SpaceBox onClick={onClick} isSelected={isSelected}>
      <Name>{name}</Name>
      {isSelected && (
        <BtnsRow>
          <IconButton onClick={(e) => handleOpenModal(e, 'EDIT')}>
            <EditIcon stroke={theme.palette.grey[300]} />
          </IconButton>
          <IconButton onClick={(e) => handleOpenModal(e, 'DELETE')}>
            <XIcon stroke={theme.palette.grey[300]} />
          </IconButton>
        </BtnsRow>
      )}
      {isDeleteModalOn && (
        <DeleteSpaceModal onClose={() => setIsDeleteModalOn(false)} />
      )}
      {isEditModalOn && (
        <SpaceInfoModal
          onClose={() => setIsEditModalOn(false)}
          type='EDIT'
          editSpace={editSpace}
        />
      )}
    </SpaceBox>
  );
};

export const SpaceBox = styled.div<{ isSelected: boolean }>`
  position: relative;
  cursor: pointer;

  width: 17.1rem;
  height: 9.1rem;
  border-radius: 0.8rem;

  background-color: #fff;
  opacity: 0.5;

  & + & {
    margin-left: 1.2rem;
  }

  ${flexSet()}

  input {
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      opacity: 1;
    `}
`;

export const Name = styled.div`
  max-width: 16rem;

  text-align: center;
  font-weight: 500;
  font-size: 2.4rem;

  /* background-color: aqua; */
`;

export const BtnsRow = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;

  display: flex;
  gap: 1rem;

  /* background-color: yellow; */
`;
