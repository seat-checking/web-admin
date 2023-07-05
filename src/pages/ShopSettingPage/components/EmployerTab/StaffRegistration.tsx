import { useState } from 'react';
import type React from 'react';
import InputCheckBox from 'components/InputCheckBox';
import {
  CheckBoxLabel,
  FlexWrapper,
  InputCheckBoxWrapper,
} from 'pages/ShopSettingPage/components/EmployerTab/StaffListItem.styled';
import {
  FlexWrapperContainer,
  Registration,
  RegistrationButton,
  RegistrationHeader,
  StaffEmail,
  StaffInfo,
  StaffName,
} from 'pages/ShopSettingPage/components/EmployerTab/StaffRegistration.styled';

export const StaffRegistration: React.FC = () => {
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);

  const toggleCheckbox = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  return (
    <Registration>
      <RegistrationHeader>
        <StaffInfo>
          <StaffEmail>wooyoung6695@naver.com</StaffEmail>
          <StaffName>최우영님</StaffName>
        </StaffInfo>
        <RegistrationButton>직원 등록하기</RegistrationButton>
      </RegistrationHeader>
      <FlexWrapperContainer>
        <FlexWrapper>
          <InputCheckBoxWrapper>
            <InputCheckBox
              id='seatsettings'
              checked={checkboxes[0]}
              onChange={() => toggleCheckbox(0)}
            />
            <CheckBoxLabel htmlFor='seatsettings'>좌석설정</CheckBoxLabel>
          </InputCheckBoxWrapper>
          <InputCheckBoxWrapper>
            <InputCheckBox
              id='statistics'
              checked={checkboxes[1]}
              onChange={() => toggleCheckbox(1)}
            />
            <CheckBoxLabel htmlFor='statistics'>가게통계</CheckBoxLabel>
          </InputCheckBoxWrapper>
          <InputCheckBoxWrapper>
            <InputCheckBox
              id='situation'
              checked={checkboxes[2]}
              onChange={() => toggleCheckbox(2)}
            />
            <CheckBoxLabel htmlFor='situation'>가게현황</CheckBoxLabel>
          </InputCheckBoxWrapper>
          <InputCheckBoxWrapper>
            <InputCheckBox
              id='storesettings'
              checked={checkboxes[3]}
              onChange={() => toggleCheckbox(3)}
            />
            <CheckBoxLabel htmlFor='storesettings'>가게설정</CheckBoxLabel>
          </InputCheckBoxWrapper>
        </FlexWrapper>
      </FlexWrapperContainer>
    </Registration>
  );
};
