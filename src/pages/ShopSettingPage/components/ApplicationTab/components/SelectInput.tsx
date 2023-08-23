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
  onItemsChange: (items: { value: string }[]) => void;
  isActive: boolean; // 상위 컴포넌트에 전달할 함수
}

export const SelectInput = ({
  placeholder,
  type,
  onItemsChange,
  isActive,
}: SelectInputProps) => {
  const [items, setItems] = useState([{ value: '' }]);

  const handleAdd = () => {
    setItems([...items, { value: '' }]);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onItemsChange(newItems); // 상위 컴포넌트에 전달
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newItems = [...items];
    newItems[index].value = e.target.value;
    setItems(newItems);
    onItemsChange(newItems); // 상위 컴포넌트에 전달
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
            value={item.value} // 배열의 항목별 상태값을 사용
            type={type}
            onChange={(e) => handleChange(e, index)}
          />
          <XIcon onClick={() => handleRemove(index)} />
        </SelectInputWrapper>
      ))}
      <PlusButton isActive={isActive} onClick={handleAdd}>
        선택지 추가하기
      </PlusButton>
    </>
  );
};
