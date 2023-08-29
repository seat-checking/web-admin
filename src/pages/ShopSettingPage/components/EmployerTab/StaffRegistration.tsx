/* eslint-disable no-console */
import { useState } from 'react';
import type React from 'react';
import { EmployeeRegistration } from 'api/store/store';
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

interface StaffRegistrationProps {
  email: string;
  name: string;
  storeId: string;
}

export const StaffRegistration: React.FC<StaffRegistrationProps> = ({
  email,
  name,
  storeId,
}) => {
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);

  const toggleCheckbox = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  const handleStaffRegistration = async () => {
    try {
      const permissionByMenu = {
        storeStatus: checkboxes[0],
        seatSetting: checkboxes[1],
        storeStatistics: checkboxes[2],
        storeSetting: checkboxes[3],
      };

      const registrationData = {
        storeId,
        email,
        permissionByMenu,
      };

      const resData = await EmployeeRegistration(registrationData);

      console.log('Registration Successful:', resData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Registration>
      <RegistrationHeader>
        <StaffInfo>
          <StaffEmail>{email}</StaffEmail>
          <StaffName>{name}</StaffName>
        </StaffInfo>
      </RegistrationHeader>
      <FlexWrapperContainer>
        <FlexWrapper>
          <InputCheckBoxWrapper>
            <InputCheckBox
              id='storeStatus'
              checked={checkboxes[0]}
              onChange={() => toggleCheckbox(0)}
            />
            <CheckBoxLabel htmlFor='storeStatus'>가게현황</CheckBoxLabel>
          </InputCheckBoxWrapper>
          <InputCheckBoxWrapper>
            <InputCheckBox
              id='seatSetting'
              checked={checkboxes[1]}
              onChange={() => toggleCheckbox(1)}
            />
            <CheckBoxLabel htmlFor='seatSetting'>좌석설정</CheckBoxLabel>
          </InputCheckBoxWrapper>
          <InputCheckBoxWrapper>
            <InputCheckBox
              id='storeStatistics'
              checked={checkboxes[2]}
              onChange={() => toggleCheckbox(2)}
            />
            <CheckBoxLabel htmlFor='storeStatistics'>가게통계</CheckBoxLabel>
          </InputCheckBoxWrapper>
          <InputCheckBoxWrapper>
            <InputCheckBox
              id='storeSetting'
              checked={checkboxes[3]}
              onChange={() => toggleCheckbox(3)}
            />
            <CheckBoxLabel htmlFor='storeSetting'>가게설정</CheckBoxLabel>
          </InputCheckBoxWrapper>
        </FlexWrapper>
      </FlexWrapperContainer>
      <RegistrationButton onClick={handleStaffRegistration}>
        직원 등록하기
      </RegistrationButton>
    </Registration>
  );
};
