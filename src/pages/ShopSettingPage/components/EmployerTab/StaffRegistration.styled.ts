import styled from 'styled-components';

export const Registration = styled.div`
  width: 54rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[200]};
  margin: 0 auto;
  margin-top: 1.1rem;
  background: #fff;
`;

export const RegistrationHeader = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 2.4rem;
`;

export const StaffInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StaffEmail = styled.div`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.4rem;
  font-weight: 700;
`;

export const StaffName = styled.div`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.2rem;
  font-weight: 400;
`;

export const RegistrationButton = styled.div`
  width: 50.8rem;
  height: 4.4rem;
  cursor: pointer;
  border-radius: 6px;
  background: ${({ theme }) => theme.palette.primary.orange};
  margin: 0 auto;
  margin-bottom: 2.4rem;
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexWrapperContainer = styled.div`
  margin-top: 4rem;
  padding-bottom: 2.4rem;
`;
