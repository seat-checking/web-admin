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
  justify-content: space-between;
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
  color: ${({ theme }) => theme.palette.primary.orange};
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
`;

export const FlexWrapperContainer = styled.div`
  margin-top: 4rem;
  padding-bottom: 2.4rem;
`;
