import { useState } from 'react';
import type React from 'react';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';
import {
  ButtonWrapper,
  EditIcon,
  FlexWrapper,
  IconWrapper,
  InputWrapper,
  RadioWrapper,
  TitleInput,
} from 'pages/ShopSettingPage/components/ApplicationTab/ApplicationTab.styled';
import {
  ButtonWrap,
  ListContent,
  ListWrapper,
  TitleText,
} from 'pages/ShopSettingPage/components/ApplicationTab/components/InformationList.styled';
import { SelectInput } from 'pages/ShopSettingPage/components/ApplicationTab/components/SelectInput';
import { ToggleIcon } from 'pages/ShopSettingPage/components/EmployerTab/StaffListItem.styled';

export const InformationList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ value: string }[]>([]); // 선택된 항목들의 상태
  const [isOpen, setIsOpen] = useState(true); // 상태 추가
  const [selectedRadio, setSelectedRadio] = useState('자유 입력');

  const handleItemsChange = (items: { value: string }[]) => {
    setSelectedItems(items);
    // 필요한 경우 여기에 추가적인 로직을 작성할 수 있습니다.
  };

  const toggleIsOpen = () => {
    // 함수 추가
    setIsOpen(!isOpen);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(event.target.value); // 라디오 버튼 값 저장
  };
  return (
    <ListWrapper>
      <ListContent>
        <FlexWrapper>
          <IconWrapper>
            {isOpen ? (
              <>
                <TitleInput
                  placeholder='*제목을 입력해주세요'
                  onFocus={() => setIsEditing(true)}
                  onBlur={() => setIsEditing(false)}
                  focused={isEditing}
                />
                {!isEditing && <EditIcon />}
              </>
            ) : (
              <TitleText>여기에 일반 텍스트를 입력하세요.</TitleText>
            )}
          </IconWrapper>
          <RadioWrapper>
            <Radio
              label='자유 입력'
              name='라디오버튼'
              value='자유 입력'
              size='small'
              id='option11'
              onChange={handleRadioChange}
            />
            <Radio
              label='선택지 제공'
              name='라디오버튼'
              value='선택지 제공'
              size='small'
              id='option22'
              onChange={handleRadioChange}
            />
          </RadioWrapper>
          <ToggleIcon onClick={toggleIsOpen} isOpen={isOpen} />
        </FlexWrapper>
        {isOpen && (
          <InputWrapper>
            {selectedRadio === '자유 입력' && (
              <Input placeholder='고객에게 가이드를 작성해주세요.(ex: 사용 목적을 입력해주세요)' />
            )}
            {selectedRadio === '선택지 제공' && (
              <SelectInput
                type='text'
                placeholder='고객에게 가이드를 작성해주세요.(ex: 사용 목적을 입력해주세요)'
                onItemsChange={handleItemsChange}
                isActive={false}
              />
            )}
            <ButtonWrap>
              <Button
                style={{
                  width: '26.5rem',
                  color: '#727582',
                  background: '#EFF0F5',
                }}
              >
                삭제하기
              </Button>
              <Button style={{ width: '26.5rem' }}>저장하기</Button>
            </ButtonWrap>
          </InputWrapper>
        )}
      </ListContent>
    </ListWrapper>
  );
};
