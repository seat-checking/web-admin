import { useState } from 'react';
import { useTheme } from 'styled-components';
import type React from 'react';
import { EmployeeRegistration } from 'api/store/store';
import InputCheckBox from 'components/InputCheckBox';
import { NoResults } from 'pages/ShopSettingPage/components/EmployerTab/EmployerTab.styled';
import {
  CheckBoxLabel,
  FlexWrapper,
  InputCheckBoxLabel,
  InputCheckBoxWrapper,
} from 'pages/ShopSettingPage/components/EmployerTab/StaffListItem.styled';
import {
  ErrorMessage,
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
  onEmployeeAdded: () => void;
}

export const StaffRegistration: React.FC<StaffRegistrationProps> = ({
  email,
  name,
  storeId,
  onEmployeeAdded,
}) => {
  const [checkboxes, setCheckboxes] = useState([true, false, false, false]);
  const [errorMessage, setErrorMessage] = useState(false); // 오류 메세지를 관리하는 state를 추가

  const theme = useTheme();

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
      setErrorMessage(false);
      onEmployeeAdded();
    } catch (error) {
      console.error(error);
      setErrorMessage(true);
    }
  };

  const isButtonDisabled = checkboxes.every((checkbox) => !checkbox);

  return (
    <Registration>
      <RegistrationHeader>
        <StaffInfo>
          <StaffEmail>{email}</StaffEmail>
          <StaffName>{name}</StaffName>
        </StaffInfo>
      </RegistrationHeader>
      <FlexWrapperContainer>
        <InputCheckBoxLabel>권한 설정</InputCheckBoxLabel>
        <FlexWrapper>
          <InputCheckBoxWrapper>
            <CheckBoxLabel>
              <InputCheckBox
                checked={checkboxes[0]}
                onChange={() => toggleCheckbox(0)}
              />
              가게현황
            </CheckBoxLabel>
          </InputCheckBoxWrapper>
          <InputCheckBoxWrapper>
            <CheckBoxLabel>
              <InputCheckBox
                checked={checkboxes[1]}
                onChange={() => toggleCheckbox(1)}
              />
              좌석설정
            </CheckBoxLabel>
          </InputCheckBoxWrapper>
          <InputCheckBoxWrapper>
            <CheckBoxLabel>
              <InputCheckBox
                checked={checkboxes[2]}
                onChange={() => toggleCheckbox(2)}
              />
              가게통계
            </CheckBoxLabel>
          </InputCheckBoxWrapper>
          <InputCheckBoxWrapper>
            <CheckBoxLabel>
              <InputCheckBox
                checked={checkboxes[3]}
                onChange={() => toggleCheckbox(3)}
              />
              가게설정
            </CheckBoxLabel>
          </InputCheckBoxWrapper>
        </FlexWrapper>
      </FlexWrapperContainer>
      {isButtonDisabled ? (
        <RegistrationButton
          style={{
            background: theme.palette.primary.orange,
            color: 'white',
          }}
          disabled
        >
          직원 등록하기
        </RegistrationButton>
      ) : (
        <RegistrationButton onClick={handleStaffRegistration}>
          직원 등록하기
        </RegistrationButton>
      )}
      {errorMessage ? (
        <ErrorMessage>
          해당 이메일로 등록된 직원이 이미 존재합니다.
        </ErrorMessage>
      ) : null}
    </Registration>
  );
};
