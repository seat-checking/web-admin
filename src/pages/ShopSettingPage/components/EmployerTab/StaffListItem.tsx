import { useState } from 'react';
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

export const StaffListItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleCheckbox = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <StaffListItemWrapper>
      <StaffInfoWrapper>
        <StaffInfoFlex>
          <StaffName>최우영</StaffName>
          <StaffEmail>wooyoung6695@gmail.com</StaffEmail>
        </StaffInfoFlex>
        <ToggleIcon onClick={toggleIsOpen} isOpen={isOpen} />
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
              <CheckBoxLabel htmlFor='check1'>가게현황</CheckBoxLabel>
            </InputCheckBoxWrapper>
            <InputCheckBoxWrapper>
              <InputCheckBox
                id='check2'
                checked={checkboxes[1]}
                onChange={() => toggleCheckbox(1)}
              />
              <CheckBoxLabel htmlFor='check2'>좌석설정</CheckBoxLabel>
            </InputCheckBoxWrapper>
            <InputCheckBoxWrapper>
              <InputCheckBox
                id='check3'
                checked={checkboxes[2]}
                onChange={() => toggleCheckbox(2)}
              />
              <CheckBoxLabel htmlFor='check3'>가게통계</CheckBoxLabel>
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
            <TextButton onClick={openModal}>직원 삭제</TextButton>
            <TextButton style={{ backgroundColor: '#FF8D4E', color: 'white' }}>
              저장하기
            </TextButton>
          </ButtonWrapper>
        </>
      )}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalHeader>직원삭제</ModalHeader>
        <ModalContent>
          <ModaMainText>정말 직원을 삭제하시나요?</ModaMainText>
          <ModaSubText>삭제한 직원은 복구할 수 없어요!</ModaSubText>
        </ModalContent>
        <ModalButtonWrapper>
          <ModalCancel onClick={closeModal}>취소</ModalCancel>
          <ModalButton>직원삭제</ModalButton>
        </ModalButtonWrapper>
      </Modal>
    </StaffListItemWrapper>
  );
};
