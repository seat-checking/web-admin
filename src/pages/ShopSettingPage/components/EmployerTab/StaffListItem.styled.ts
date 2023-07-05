import styled from 'styled-components';
import ToggleDown from 'assets/icons/chevrondown.svg';
import ToggleUp from 'assets/icons/chevronup.svg';

export const StaffListItemWrapper = styled.div`
  width: 54rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[200]};
`;

export const StaffInfoWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
`;

export const StaffInfoFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
  margin-bottom: 2.3rem;
`;
