import styled from 'styled-components';
import CornerDown from 'assets/icons/corner-down-right.svg';
import X from 'assets/icons/xicon.svg';

interface PlusButtonProps {
  isActive?: boolean;
}

export const SelectInputWrapper = styled.div`
  width: 53.9rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`;

export const CornerDownIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  background-image: url(${CornerDown});
  background-size: cover;
  cursor: pointer;
`;
export const XIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  background-image: url(${X});
  background-size: cover;
  cursor: pointer;
`;

export const PlusButton = styled.div<PlusButtonProps>`
  width: 100%;
  height: 4.2rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.6rem;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#FFFFFF' : '#F2F4F8')};
  color: ${({ theme }) => theme.palette.grey[400]};
`;
