import { useState } from 'react';
import styled from 'styled-components';
import { AddWifiModal } from 'pages/ShopSettingPage/components/ShopInfoTab/components/AddWifiModal';

interface WifiData {
  name: string;
  address: string;
}

interface WifiProps {
  wifiList?: WifiData[];
}

/**
 * Wifi 관련 컴포넌트
 */
export const Wifi: React.FC<WifiProps> = ({ wifiList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddWifiBtn onClick={handleOpenModal}>
        현재 컴퓨터에 연결된 Wi-Fi 등록하기
      </AddWifiBtn>
      <ul>
        <NoWifiItem>현재 등록된 WiFi가 없어요.</NoWifiItem>
        <WifiItem>사용자가 설정한 와이파이명1</WifiItem>
      </ul>
      {isModalOpen && <AddWifiModal onClose={handleCloseModal} />}
    </>
  );
};

const AddWifiBtn = styled.button`
  margin-bottom: 0.8rem;

  width: 100%;
  height: 4.2rem;
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.palette.grey[500]};

  color: white;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    filter: brightness(95%);
  }
`;

const WifiItem = styled.li`
  width: 100%;
  padding: 0.4rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.palette.grey[100]};
  border-radius: 0.8rem;

  background-color: white;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem;

  & + & {
    margin-top: 0.8rem;
  }
`;

const NoWifiItem = styled(WifiItem)`
  background-color: ${({ theme }) => theme.palette.grey[200]};
  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;
