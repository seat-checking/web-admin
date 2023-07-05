import { useState } from 'react';
import InputCheckBox from 'components/InputCheckBox';

import {
  ButtonWrapper,
  CheckBoxLabel,
  FlexWrapper,
  InputCheckBoxLabel,
  InputCheckBoxWrapper,
  StaffEmail,
  StaffInfoFlex,
  StaffInfoWrapper,
  StaffListItemWrapper,
  StaffName,
  TextButton,
  ToggleIcon,
} from 'pages/ShopSettingPage/components/EmployerTab/StaffListItem.styled';

export const StaffListItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleCheckbox = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  return (
    <StaffListItemWrapper>
      <StaffInfoWrapper>
        <StaffName>최우영</StaffName>
        <StaffInfoFlex>
          <StaffEmail>wooyoung6695@gmail.com</StaffEmail>
          <ToggleIcon onClick={toggleIsOpen} isOpen={isOpen} />
        </StaffInfoFlex>
      </StaffInfoWrapper>
      {isOpen && (
        <>
          <InputCheckBoxLabel>권한 설정</InputCheckBoxLabel>
          <FlexWrapper>
            <InputCheckBoxWrapper>
              <InputCheckBox
                id='check1'
                checked={checkboxes[0]}
                onChange={() => toggleCheckbox(0)}
              />
              <CheckBoxLabel htmlFor='check1'>좌석설정</CheckBoxLabel>
            </InputCheckBoxWrapper>
            <InputCheckBoxWrapper>
              <InputCheckBox
                id='check2'
                checked={checkboxes[1]}
                onChange={() => toggleCheckbox(1)}
              />
              <CheckBoxLabel htmlFor='check2'>가게통계</CheckBoxLabel>
            </InputCheckBoxWrapper>
            <InputCheckBoxWrapper>
              <InputCheckBox
                id='check3'
                checked={checkboxes[2]}
                onChange={() => toggleCheckbox(2)}
              />
              <CheckBoxLabel htmlFor='check3'>가게현황</CheckBoxLabel>
            </InputCheckBoxWrapper>
            <InputCheckBoxWrapper>
              <InputCheckBox
                id='check4'
                checked={checkboxes[3]}
                onChange={() => toggleCheckbox(3)}
              />
              <CheckBoxLabel htmlFor='check4'>가게설정</CheckBoxLabel>
            </InputCheckBoxWrapper>
          </FlexWrapper>
          <ButtonWrapper>
            <TextButton>직원 삭제</TextButton>
            <TextButton style={{ backgroundColor: '#FF8D4E', color: 'white' }}>
              저장하기
            </TextButton>
          </ButtonWrapper>
        </>
      )}
    </StaffListItemWrapper>
  );
};
