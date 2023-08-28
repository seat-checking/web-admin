import { useState } from 'react';
import { useTheme } from 'styled-components';
import type React from 'react';
import { requestInformation } from 'api/store/store';
import { STORAGE } from 'common/utils/constants';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';

import {
  ApplicationTabWrapper,
  ButtonWrapper,
  EditIcon,
  FlexWrapper,
  IconWrapper,
  InputWrapper,
  RadioWrapper,
  TitleInput,
} from 'pages/ShopSettingPage/components/ApplicationTab/components/InformationAdd.styled';
import { SelectInput } from 'pages/ShopSettingPage/components/ApplicationTab/components/SelectInput';
import { LabelWrapper } from 'pages/ShopSettingPage/components/EmployerTab/EmployerTab.styled';

interface InputFieldProps {
  id: number;
  title: string;
  type: '자유 입력' | '선택지 제공';
  contentGuide: string;
}

interface InformationAddProps {
  fetchData: () => void;
}

export const InformationAdd: React.FC<InformationAddProps> = ({
  fetchData,
}) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [inputFields, setInputFields] = useState<InputFieldProps[]>([
    {
      id: Date.now(),
      title: '',
      type: '자유 입력',
      contentGuide: '',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRadioChange = (fieldId: number, value: string) => {
    const selectedType = value === 'option1' ? '자유 입력' : '선택지 제공';

    setInputFields(
      inputFields.map((field) =>
        field.id === fieldId
          ? { ...field, option: value, type: selectedType }
          : field,
      ),
    );
  };

  const handleItemsChange = (fieldId: number, items: { value: string }[]) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              contentGuide: items.map((item) => item.value).join(','),
            }
          : field,
      ),
    );
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

  const handleSubmit = async () => {
    const storeId = localStorage.getItem(STORAGE.storeId);
    if (!storeId) {
      console.error('error');
      return;
    }

    setIsLoading(true);

    const formattedData = inputFields.map((field) => ({
      title: field.title,
      type: field.type,
      contentGuide: field.contentGuide.split(','),
    }));

    try {
      const response = await requestInformation({
        storeId,
        data: formattedData[0],
      });
      fetchData();
      setIsLoading(false);
      setInputFields([
        {
          id: Date.now(),
          title: '',
          type: '자유 입력',
          contentGuide: '',
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isAnyInputFilled = (): boolean => {
    for (const field of inputFields) {
      if (field.title && field.contentGuide) {
        return true;
      }
    }
    return false;
  };

  return (
    <ApplicationTabWrapper>
      <LabelWrapper>
        <Label label='고객에게 받을 정보' />
      </LabelWrapper>
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
                onChange={() => handleRadioChange(field.id, 'option1')}
                defaultChecked
              />
              <Radio
                label='선택지 제공'
                id='option2'
                name={field.id.toString()}
                value={field.type}
                size='small'
                onChange={() => handleRadioChange(field.id, 'option2')}
              />
            </RadioWrapper>
          </FlexWrapper>
          {field.type === '자유 입력' && (
            <Input
              placeholder='고객에게 가이드를 작성해주세요.(ex: 사용 목적을 입력해주세요)'
              value={field.contentGuide}
              onChange={handleContentGuideChange(field.id)}
            />
          )}
          {field.type === '선택지 제공' && (
            <SelectInput
              placeholder='고객에게 가이드를 작성해주세요.(ex: 사용 목적을 입력해주세요)'
              type='text'
              onItemsChange={(items) => handleItemsChange(field.id, items)}
              isActive
            />
          )}
        </InputWrapper>
      ))}
      <ButtonWrapper>
        {isAnyInputFilled() ? (
          <Button
            style={{
              marginTop: '2.4rem',
              width: '53.9rem',
              marginBottom: '4rem',
            }}
            onClick={handleSubmit}
          >
            요청 추가하기
          </Button>
        ) : (
          <Button
            style={{
              marginTop: '2.4rem',
              width: '53.9rem',
              marginBottom: '4rem',
              color: theme.palette.grey[400],
            }}
            isDisabled
          >
            요청 추가하기
          </Button>
        )}
      </ButtonWrapper>
    </ApplicationTabWrapper>
  );
};
