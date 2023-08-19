import { useState } from 'react';
import styled, { css, useTheme } from 'styled-components/macro';
import type { ChangeEvent } from 'react';
import { ReactComponent as EditIcon } from 'assets/icons/edit-md.svg';
import { ReactComponent as XIcon } from 'assets/icons/x.svg';

import { IconButton } from 'components/XButton';
import { DeleteSpaceModal } from 'pages/LayoutSettingPage/components/DeleteSpaceModal';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { flexSet } from 'styles/mixin';

interface SpaceProps {
  id: number;
  name: string;
}

/**
 * Space 컴포넌트 (흰색 네모)
 */
export const Space: React.FC<SpaceProps> = ({ id, name }) => {
  const theme = useTheme();

  const { spaceId, setSpaceId } = useSpaceId();
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);

  const handleChangeSpaceParmas = () => {
    setSpaceId(id);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOn(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOn(false);
  };

  return (
    <SpaceBox onClick={handleChangeSpaceParmas} isSelected={spaceId === id}>
      <Name>{name}</Name>
      <BtnsRow>
        <IconButton onClick={handleOpenDeleteModal}>
          <EditIcon stroke={theme.palette.grey[300]} />
        </IconButton>
        <IconButton onClick={handleOpenDeleteModal}>
          <XIcon stroke={theme.palette.grey[300]} />
        </IconButton>
      </BtnsRow>
      <DeleteSpaceModal
        isOpen={isDeleteModalOn}
        onClose={handleCloseDeleteModal}
      />
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
