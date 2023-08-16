import React, { useState } from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';
import {
  ApplicationTabWrapper,
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
}

export const ApplicationTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputFields, setInputFields] = useState<InputFieldProps[]>([]);

  const handleRadioChange = (fieldId: number, value: string) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === fieldId ? { ...field, option: value } : field,
      ),
    );
  };

  const addInputField = () => {
    setInputFields([...inputFields, { id: Date.now(), option: 'option1' }]);
  };

  const removeInputField = (id: number) => {
    setInputFields(inputFields.filter((field) => field.id !== id));
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
              />
              {!isEditing && <EditIcon />}
            </IconWrapper>
            <RadioWrapper>
              <Radio
                label='단답형'
                id='option1'
                name={field.id.toString()} // 각 라디오 그룹에 고유한 이름을 설정
                value='option1'
                onChange={() => handleRadioChange(field.id, 'option1')}
                defaultChecked
              />
              <Radio
                label='선택지 제공'
                id='option2'
                name={field.id.toString()} // 각 라디오 그룹에 고유한 이름을 설정
                value='option2'
                onChange={() => handleRadioChange(field.id, 'option2')}
              />
              <DeleteButton onClick={() => removeInputField(field.id)}>
                삭제
              </DeleteButton>
            </RadioWrapper>
          </FlexWrapper>
          {field.option === 'option1' && (
            <Input placeholder='고객에게 가이드를 작성해주세요.(ex: 사용 목적을 입력해주세요)' />
          )}
          {field.option === 'option2' && <SelectInput />}
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
