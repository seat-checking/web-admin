import { useState } from 'react';
import type React from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';
import {
  ApplicationTabWrapper,
  Border,
  DeleteButton,
  EditIcon,
  FlexWrapper,
  IconWrapper,
  InputWrapper,
  PlusCirclIcon,
  PlusText,
  PlusWrapper,
  RadioWrapper,
  TitleInput,
} from 'pages/ShopSettingPage/components/ApplicationTab/ApplicationTab.styled';
import { SelectInput } from 'pages/ShopSettingPage/components/ApplicationTab/components/SelectInput';

interface InputFieldProps {
  id: number;
  option: string;
  title: string;
  type: string;
  contentGuide: string;
}

export const ApplicationTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputFields, setInputFields] = useState<InputFieldProps[]>([]);
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<string>('단답형');
  const [contentGuide, setContentGuide] = useState<string>('');

  const handleRadioChange = (
    fieldId: number,
    value: string,
    selectedType: string,
  ) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === fieldId
          ? { ...field, option: value, type: selectedType }
          : field,
      ),
    );
  };
  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        id: Date.now(),
        option: 'option1',
        title: '',
        type: '단답형',
        contentGuide: '',
      },
    ]);
  };
  const handleItemsChange = (fieldId: number, items: { value: string }[]) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === fieldId
          ? { ...field, contentGuide: JSON.stringify(items) } // 아이템을 JSON 문자열로 저장
          : field,
      ),
    );
  };

  const removeInputField = (id: number) => {
    setInputFields(inputFields.filter((field) => field.id !== id));
  };

  const handleTitleChange =
    (fieldId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputFields(
        inputFields.map((field) =>
          field.id === fieldId ? { ...field, title: e.target.value } : field,
        ),
      );
    };

  const handleContentGuideChange =
    (fieldId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputFields(
        inputFields.map((field) =>
          field.id === fieldId
            ? { ...field, contentGuide: e.target.value }
            : field,
        ),
      );
    };

  return (
    <ApplicationTabWrapper>
      <Label label='고객에게 받을 정보' />
      {inputFields.map((field) => (
        <InputWrapper key={field.id}>
          <FlexWrapper>
            <IconWrapper>
              <TitleInput
                placeholder='*제목을 입력해주세요'
                onFocus={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}
                focused={isEditing}
                value={field.title}
                onChange={handleTitleChange(field.id)}
              />
              {!isEditing && <EditIcon />}
            </IconWrapper>
            <RadioWrapper>
              <Radio
                label='자유 입력'
                id='option1'
                name={field.id.toString()}
                value={field.type}
                size='small'
                onChange={() => handleRadioChange(field.id, 'option1', type)}
                defaultChecked
              />
              <Radio
                label='선택지 제공'
                id='option2'
                name={field.id.toString()}
                value={field.type}
                size='small'
                onChange={() => handleRadioChange(field.id, 'option2', type)}
              />
              <DeleteButton onClick={() => removeInputField(field.id)}>
                삭제
              </DeleteButton>
            </RadioWrapper>
          </FlexWrapper>
          {field.option === 'option1' && (
            <Input
              placeholder='고객에게 가이드를 작성해주세요.(ex: 사용 목적을 입력해주세요)'
              value={field.contentGuide}
              onChange={handleContentGuideChange(field.id)}
            />
          )}
          {field.option === 'option2' && (
            <SelectInput
              placeholder='고객에게 가이드를 작성해주세요.(ex: 사용 목적을 입력해주세요)'
              type='text'
              onItemsChange={(items) => handleItemsChange(field.id, items)}
            />
          )}
          <Border />
        </InputWrapper>
      ))}

      <PlusWrapper onClick={addInputField}>
        <PlusCirclIcon />
        <PlusText>추가하기</PlusText>
      </PlusWrapper>
      <Button style={{ marginTop: '8.4rem' }}>저장하기</Button>
    </ApplicationTabWrapper>
  );
};
