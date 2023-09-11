import styled from 'styled-components';
import ToggleDown from 'assets/icons/chevrondown.svg';
import ToggleUp from 'assets/icons/chevronup.svg';

export const StaffListItemWrapper = styled.div`
  width: 54rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[200]};
  margin-bottom: 1.6rem;
`;

export const StaffInfoWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const StaffInfoFlex = styled.div``;

export const StaffName = styled.div`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 2.4rem;
`;

export const StaffEmail = styled.div`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 2.3rem;
`;

export const InputCheckBoxWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
  margin-top 0.8rem;
`;

export const InputCheckBoxLabel = styled.label`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 1.4rem;
`;

export const CheckBoxLabel = styled.label`
  color: ${({ theme }) => theme.palette.black.main};
  font-size: 1.4rem;
  font-weight: 600;
  padding-top: 0.1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top 4rem;
  margin-bottom 2.4rem;
`;

export const TextButton = styled.div`
  width: 25rem;
  height: 4.4rem;
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.palette.grey[400]};
  background-color: ${({ theme }) => theme.palette.grey[100]};
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToggleIcon = styled.div<{ isOpen: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  background-image: url(${(props) => (props.isOpen ? ToggleUp : ToggleDown)});
  background-size: cover;
  cursor: pointer;
`;

export const ModalHeader = styled.div`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 700;
  width: 100%;
  height: 4.3rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey[50]};
  display: flex;
  align-items: center;
  padding-left: 1.6rem;
`;

export const ModalContent = styled.div`
  margin-top: 1.6rem;
  margin-bottom: 2.4rem;
`;

export const ModaMainText = styled.div`
  color: black;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
`;
export const ModaSubText = styled.div`
  color: ${({ theme }) => theme.palette.grey[300]};
  text-align: center;
  font-size: 1.4rem;
  font-weight: 400;
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
`;

export const ModalCancel = styled.div`
  width: 15.1rem;
  height: 4.5rem;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.4rem;
  font-weight: 500;
`;
export const ModalButton = styled.div`
  width: 15.1rem;
  height: 4.5rem;
  background-color: ${({ theme }) => theme.palette.grey[500]};
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
`;
