import styled from 'styled-components/macro';
import { StatusTag } from 'pages/ShopStatusPage/ReservationTab/components/StatusTag';

interface StatusTabsProps {
  activeTab: number;
  onClickTab: (index: number) => void;
}

/**
 * 예약 상태 탭 컴포넌트
 */
export const StatusTabs: React.FC<StatusTabsProps> = ({
  activeTab,
  onClickTab,
}) => {
  return (
    <Wrap>
      <StatusTag active={activeTab === 0} onClick={() => onClickTab(0)}>
        ⏳ 대기 중
      </StatusTag>
      <StatusTag active={activeTab === 1} onClick={() => onClickTab(1)}>
        ✅ 처리된 예약
      </StatusTag>
      <StatusTag active={activeTab === 2} onClick={() => onClickTab(2)}>
        전체
      </StatusTag>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  gap: 0.8rem;

  padding: 1.6rem 3.3rem;

  border-bottom: 0.2rem solid ${({ theme }) => theme.palette.grey[100]};
  background: ${({ theme }) => theme.palette.grey[50]};
`;
