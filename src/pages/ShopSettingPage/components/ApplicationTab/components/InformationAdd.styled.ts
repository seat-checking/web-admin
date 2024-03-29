import styled from 'styled-components';
import edit from 'assets/icons/edit-sm.svg';
import plusCircl from 'assets/icons/plus.svg';

interface TitleInputProps {
  focused: boolean;
}

export const LabelWrapper = styled.div`
  width: 53.9rem;
  margin: 0 auto;
  padding-top: 4rem;
`;

export const ApplicationTabWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.grey[50]};
`;

export const InputWrapper = styled.div`
  width: 53.9rem;
  margin: 0 auto;
  height: auto;
`;

export const Border = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
`;

export const TitleInput = styled.input<TitleInputProps>`
  width: 14.8rem;
  height: 2.4rem;
  color: ${({ theme }) => theme.palette.black.main};
  font-size: 1.6rem;
  font-weight: 600;
  border: ${({ focused }) => (focused ? '0.05rem solid black' : 'none')};
  border-radius: 0.4rem;
  transition: border 0.3s ease;
  margin-right: ${({ focused }) => (focused ? '1.6rem;' : 'none')};
  background-color: ${({ focused }) => (focused ? '#fff' : '#F2F4F8')};

  ::placeholder {
    color: ${({ theme }) => theme.palette.grey[300]};
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const EditIcon = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  background-image: url(${edit});
  background-size: cover;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  width: 2.5rem;
  height: 2.4rem;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
`;

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;
export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 4.4rem;
  padding-top: 4.4rem;
  width: 53.9rem;
`;

export const PlusCirclIcon = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  background-image: url(${plusCircl});
  background-size: cover;
`;

export const PlusText = styled.div`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 1.8rem;
  font-weight: 600;
`;

export const PlusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  margin: 0 auto;
  width: 10.3rem;
  margin-top: 3.2rem;
`;
export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;
