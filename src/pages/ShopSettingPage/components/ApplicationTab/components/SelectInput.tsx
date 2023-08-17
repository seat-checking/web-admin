import { forwardRef, useState } from 'react';
import type { Ref } from 'react';
import type React from 'react';
import { Input } from 'components/Input';
import {
  CornerDownIcon,
  PlusButton,
  SelectInputWrapper,
  XIcon,
} from 'pages/ShopSettingPage/components/ApplicationTab/components/SelectInput.styled';

interface SelectInputProps {
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SelectInput = ({
  placeholder,
  type,
  value,
  onChange,
}: SelectInputProps) => {
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
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={onChange}
          />
          <XIcon onClick={() => handleRemove(index)} />
        </SelectInputWrapper>
      ))}
      <PlusButton onClick={handleAdd}>선택지 추가하기</PlusButton>
    </>
  );
};
