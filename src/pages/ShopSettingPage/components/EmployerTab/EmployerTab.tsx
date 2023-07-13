import type React from 'react';

import { Label } from 'components/Label';
import {
  EmployerTabWrapper,
  HelperCircle,
  HelperText,
  HelperTextWrapper,
  InputWrapper,
  LabelWrapper,
  SearchIcon,
  StaffListWrapper,
  StyledInput,
} from 'pages/ShopSettingPage/components/EmployerTab/EmployerTab.styled';
import { StaffListItem } from 'pages/ShopSettingPage/components/EmployerTab/StaffListItem';
import { StaffRegistration } from 'pages/ShopSettingPage/components/EmployerTab/StaffRegistration';

export const EmployerTab: React.FC = () => {
  return (
    <>
      <EmployerTabWrapper>
        <LabelWrapper>
          <Label label='직원 등록' />
          <HelperTextWrapper>
            <HelperCircle />
            <HelperText>
              직원을 등록하고 직원의 권한을 설정할 수 있어요.
            </HelperText>
          </HelperTextWrapper>
        </LabelWrapper>
        <InputWrapper>
          <SearchIcon />
          <StyledInput placeholder='직원의 이메일을 검색해 주세요.' />
        </InputWrapper>
        <StaffRegistration />
      </EmployerTabWrapper>
      <StaffListWrapper>
        <Label label='직원 목록' />
        <StaffListItem />
      </StaffListWrapper>
    </>
  );
};
