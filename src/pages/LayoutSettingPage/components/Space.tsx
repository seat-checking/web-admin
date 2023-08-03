import { useState } from 'react';
import styled, { css } from 'styled-components/macro';
import type { ChangeEvent } from 'react';
import { ReactComponent as XIcon } from 'assets/icons/x.svg';
import { flexSet } from 'styles/mixin';

interface SpaceProps {
  id: number;
  name: string;
  onClick: (id: number) => void;
  isSelected: boolean;
  deleteSpace: (id: number) => void;
}

/**
 * Space 컴포넌트 (흰색 네모)
 */
export const Space: React.FC<SpaceProps> = ({
  id,
  name,
  onClick,
  isSelected,
  deleteSpace,
}) => {
  const [spaceName, setSpaceName] = useState(name);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setSpaceName(event.currentTarget.value);
  };

  const handleDeleteSpace = () => {
    deleteSpace(id);
  };

  return (
    <SpaceBox onClick={() => onClick(id)} isSelected={isSelected}>
      <Input type='text' onChange={handleChangeName} value={spaceName} />
      <DeleteWrap onClick={handleDeleteSpace}>
        <XIcon />
      </DeleteWrap>
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

export const Input = styled.input`
  max-width: 16rem;

  text-align: center;
  font-weight: 500;
  font-size: 2.4rem;

  /* background-color: aqua; */
`;

export const DeleteWrap = styled.div`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;

  :hover {
    path {
      // todo 순권님 (마우스 올렸을 때 디자인)
      stroke-width: 4;
      /* stroke: black; */
    }
  }
`;
