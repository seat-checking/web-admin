import { useState } from 'react';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import { ReactComponent as PlusCircle } from 'assets/icons/plus-circle.svg';

import { Space } from 'pages/LayoutSettingPage/components/Space';
import {
  AddRow,
  AddText,
  Wrap,
} from 'pages/LayoutSettingPage/components/SpaceRow.styled';

interface SpaceRowProps {
  spaceList: SpaceType[];
  addSpace: () => void;
  deleteSpace: (id: number) => void;
}

/**
 * space 목록 컴포넌트 (검은색 영역)
 */
export const SpaceRow: React.FC<SpaceRowProps> = ({
  spaceList,
  addSpace,
  deleteSpace,
}) => {
  const [selected, setSelected] = useState(spaceList[0]?.storeSpaceId ?? 1);
  const handleClickSpace = (id: number) => {
    setSelected(id);
  };

  const handleAddSpace = () => {
    addSpace();
  };

  return (
    <Wrap>
      {spaceList.map((space) => (
        <Space
          key={space.storeSpaceId}
          id={space.storeSpaceId}
          name={space.name}
          onClick={handleClickSpace}
          isSelected={space.storeSpaceId === selected}
          deleteSpace={deleteSpace}
        />
      ))}
      <AddRow onClick={handleAddSpace}>
        <PlusCircle stroke='white' />
        <AddText>스페이스 추가</AddText>
      </AddRow>
    </Wrap>
  );
};
