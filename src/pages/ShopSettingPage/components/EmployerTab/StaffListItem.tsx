import { useEffect, useState } from 'react';
import InputCheckBox from 'components/InputCheckBox';

import { Modal } from 'components/Modal';
import {
  ButtonWrapper,
  CheckBoxLabel,
  FlexWrapper,
  InputCheckBoxLabel,
  InputCheckBoxWrapper,
  ModaMainText,
  ModaSubText,
  ModalButton,
  ModalButtonWrapper,
  ModalCancel,
  ModalContent,
  ModalHeader,
  StaffEmail,
  StaffInfoFlex,
  StaffInfoWrapper,
  StaffListItemWrapper,
  StaffName,
  TextButton,
  ToggleIcon,
} from 'pages/ShopSettingPage/components/EmployerTab/StaffListItem.styled';

interface StaffListItemProps {
  name: string;
  email: string;
  staffDeleteClick: () => void;
  modifyPermissionClick: (newPermissions: boolean[]) => void;
  permissions: {
    storeStatus: boolean;
    seatSetting: boolean;
    storeStatistics: boolean;
    storeSetting: boolean;
  };
}

export const StaffListItem: React.FC<StaffListItemProps> = ({
  name,
  email,
  staffDeleteClick,
  modifyPermissionClick,
  permissions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [checkboxes, setCheckboxes] = useState([
    permissions.storeStatus,
    permissions.seatSetting,
    permissions.storeStatistics,
    permissions.storeSetting,
  ]);

  useEffect(() => {
    setCheckboxes([
      permissions.storeStatus,
      permissions.seatSetting,
      permissions.storeStatistics,
      permissions.storeSetting,
    ]);
  }, [permissions]);
  const handleToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleCheckbox = (index: number) => {
    if (index === 2) return;

    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <StaffListItemWrapper>
      <StaffInfoWrapper onClick={handleToggleIsOpen}>
        <StaffInfoFlex>
          <StaffName>{name}</StaffName>
          <StaffEmail>{email}</StaffEmail>
        </StaffInfoFlex>
        <ToggleIcon isOpen={isOpen} />
      </StaffInfoWrapper>
      {isOpen && (
        <>
          <InputCheckBoxLabel>권한 설정</InputCheckBoxLabel>
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
                disabled
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
          <ButtonWrapper>
            <TextButton onClick={handleOpenModal}>직원 삭제</TextButton>
            <TextButton
              style={{ backgroundColor: '#FF8D4E', color: 'white' }}
              onClick={() => modifyPermissionClick(checkboxes)}
            >
              저장하기
            </TextButton>
          </ButtonWrapper>
        </>
      )}
      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          <ModalHeader>직원삭제</ModalHeader>
          <ModalContent>
            <ModaMainText>정말 직원을 삭제하시나요?</ModaMainText>
            <ModaSubText>삭제한 직원은 복구할 수 없어요!</ModaSubText>
          </ModalContent>
          <ModalButtonWrapper>
            <ModalCancel onClick={handleCloseModal}>취소</ModalCancel>
            <ModalButton onClick={staffDeleteClick}>직원삭제</ModalButton>
          </ModalButtonWrapper>
        </Modal>
      )}
    </StaffListItemWrapper>
  );
};
