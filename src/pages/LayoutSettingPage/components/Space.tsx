import { useState } from 'react';
import { useTheme } from 'styled-components/macro';
import { ReactComponent as EditIcon } from 'assets/icons/edit-md.svg';
import { ReactComponent as XIcon } from 'assets/icons/x.svg';

import { IconButton } from 'components/XButton';
import { DeleteSpaceModal } from 'pages/LayoutSettingPage/components/DeleteSpaceModal';
import {
  BtnsRow,
  Name,
  SpaceBox,
} from 'pages/LayoutSettingPage/components/Space.styled';
import { SpaceAddEditModal } from 'pages/LayoutSettingPage/components/SpaceAddEditModal';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';

interface SpaceProps {
  id: number;
  name: string;
  onClick: () => void;
  editSpace: (id: number, name: string) => void;
  clearSpaces: () => void;
}

/**
 * Space 컴포넌트 (흰색 네모)
 */
export const Space: React.FC<SpaceProps> = ({
  id,
  name,
  onClick,
  editSpace,
  clearSpaces,
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
      <Name $length={name.length}>{name}</Name>
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
        <DeleteSpaceModal
          onClose={() => setIsDeleteModalOn(false)}
          clearSpaces={clearSpaces}
        />
      )}
      {isEditModalOn && (
        <SpaceAddEditModal
          onClose={() => setIsEditModalOn(false)}
          type='EDIT'
          editSpace={editSpace}
        />
      )}
    </SpaceBox>
  );
};
