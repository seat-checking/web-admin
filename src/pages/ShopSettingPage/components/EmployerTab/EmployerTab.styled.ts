import styled from 'styled-components';
import Circle from 'assets/icons/alert-circle.svg';
import Search from 'assets/icons/search.svg';

export const EmployerTabWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.palette.grey[50]};
  padding-top: 4rem;
  padding-bottom: 4rem;
`;

export const LabelWrapper = styled.div`
width:53.9rem;
display: flex;
margin 0 auto;
gap:0.6rem;
`;

export const InputWrapper = styled.div`
  width: 53.9rem;
  margin: 0 auto;
  position: relative;
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background-image: url(${Search});
  background-size: cover;
  width: 1.6rem;
  height: 1.6rem;
`;

export const StyledInput = styled.input`
  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
  width: 53.9rem;
  height: 4.8rem;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.4rem;
  font-weight: 400;
  padding-left: 3.2rem;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey[300]};
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

export const HelperTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.8rem;
`;

export const HelperCircle = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  background-image: url(${Circle});
  background-size: cover;
  margin-right: 0.4rem;
`;

export const HelperText = styled.div`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 1.2rem;
  font-weight: 400;
`;

export const StaffListWrapper = styled.div`
  width: 53.9rem;
  margin: 0 auto;
  margin-top: 4rem;
`;
