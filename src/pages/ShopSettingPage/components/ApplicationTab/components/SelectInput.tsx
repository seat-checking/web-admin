import React, { useState } from 'react';
import { Input } from 'components/Input';
import {
  CornerDownIcon,
  PlusButton,
  SelectInputWrapper,
  XIcon,
} from 'pages/ShopSettingPage/components/ApplicationTab/components/SelectInput.styled';

export const SelectInput = () => {
  const [items, setItems] = useState([{}]);

  const handleAdd = () => {
    setItems([...items, {}]);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <>
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SelectInputWrapper key={index}>
          <CornerDownIcon />
          <Input
            style={{ width: '47.5rem' }}
            placeholder='ex: 프로젝트 및 스터디'
          />
          <XIcon onClick={() => handleRemove(index)} />
        </SelectInputWrapper>
      ))}
      <PlusButton onClick={handleAdd}>선택지 추가하기</PlusButton>
    </>
  );
};
