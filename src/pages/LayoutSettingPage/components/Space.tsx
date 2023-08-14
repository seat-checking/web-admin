import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import type { ChangeEvent } from 'react';

import { XButton } from 'components/XButton';
import { flexSet } from 'styles/mixin';

interface SpaceProps {
  id: number;
  name: string;
}

/**
 * Space 컴포넌트 (흰색 네모)
 */
export const Space: React.FC<SpaceProps> = ({ id, name }) => {
  const [spaceName, setSpaceName] = useState(name);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeSpaceParmas = () => {
    setSearchParams({ ...searchParams, space: String(id) });
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setSpaceName(event.currentTarget.value);
  };

  const handleDeleteSpace = () => {
    // TODO 삭제 api 나오면 연결
  };

  return (
    <SpaceBox
      onClick={handleChangeSpaceParmas}
      isSelected={searchParams.get('space') === String(id)}
    >
      <Input type='text' onChange={handleChangeName} value={spaceName} />
      <XButton
        onClick={handleDeleteSpace}
        style={{
          position: 'absolute',
          top: '0.4rem',
          right: '0.4rem',
        }}
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

  :hover::after {
    display: inline-block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2.4rem;
    height: 2.4rem;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20%;
  }
`;
