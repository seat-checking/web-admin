import { useState } from 'react';
import type React from 'react';
import { RequestInformation } from 'api/store/store';
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
  LabelWrapper,
  RadioWrapper,
  TitleInput,
} from 'pages/ShopSettingPage/components/ApplicationTab/ApplicationTab.styled';
import { InformationList } from 'pages/ShopSettingPage/components/ApplicationTab/components/InformationList';
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
  const [inputFields, setInputFields] = useState<InputFieldProps[]>([
    {
      id: Date.now(),
      option: 'option1',
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
            } // 모든 아이템의 value를 쉼표로 구분된 문자열로 저장
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
    const storeId = localStorage.getItem('storeId');
    if (!storeId) {
      console.error('error');
      return;
    }

    setIsLoading(true); // 로딩 시작

    const formattedData = inputFields.map((field) => ({
      title: field.title,
      type: field.type,
      contentGuide: field.contentGuide.split(','), // 쉼표로 구분된 문자열을 다시 배열로 변환
    }));

    try {
      const response = await RequestInformation({
        storeId,
        data: formattedData,
      });

      setIsLoading(false);
      console.log('Response:', response);
      // 추가적으로 성공 시의 로직을 구현해주세요.
    } catch (error) {
      console.error('Error:', error);
      // 오류 발생 시의 로직을 구현해주세요.
    }
  };

  return (
    <>
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
                isActive
              />
            )}
          </InputWrapper>
        ))}
        <ButtonWrapper>
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
        </ButtonWrapper>
      </ApplicationTabWrapper>
      <LabelWrapper>
        <Label required={false} label='요청 정보 목록' />
      </LabelWrapper>
      <InformationList />
    </>
  );
};
