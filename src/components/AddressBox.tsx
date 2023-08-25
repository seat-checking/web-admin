import styled from 'styled-components/macro';
import type { MouseEventHandler } from 'react';
import { Button } from 'components/Button';
import { Input } from 'components/Input';

interface AddrressBoxProps {
  value: string;
  onClick: MouseEventHandler;
}

/**
 * 가게 주소 찾기 컴포넌트 (회원가입, 가게 설정에서 사용)
 */
export const AddressBox: React.FC<AddrressBoxProps> = ({ value, onClick }) => {
  return (
    <AddressWrap>
      <AddressInput value={value} placeholder='주소' disabled />
      <LocationBtn onClick={onClick}>가게 주소 찾기</LocationBtn>
    </AddressWrap>
  );
};

const AddressWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const AddressInput = styled(Input)`
  width: 40rem;
`;

const LocationBtn = styled(Button)`
  width: 13rem;
  height: 4.8rem;

  background-color: white;
  /* border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
  color: ${({ theme }) => theme.palette.grey[400]}; */
  background-color: ${({ theme }) => theme.palette.grey[500]};
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
`;
