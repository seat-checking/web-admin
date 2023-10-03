import styled from 'styled-components';
import { useTab } from 'common/hooks/useTab';
import { Tabs } from 'components/Tabs.tsx';
import { StyledSideBar } from 'pages/LayoutSettingPage/LayoutSettingPage.styled';
import { ReservationTab } from 'pages/ShopStatusPage/ReservationTab';
import { SeatTab } from 'pages/ShopStatusPage/SeatTab';
import { ShopContent } from 'pages/ShopStatusPage/ShopContent';
import { Wrap } from 'pages/ShopStatusPage/ShopStatusPage.styled';

/**
 * 가게 현황 페이지
 */
export const ShopStatusPage: React.FC = () => {
  const { activeTab, changeTab } = useTab();

  return (
    <Wrap>
      <StyledSideBar>
        <Tabs
          onClickTab={changeTab}
          activeTab={activeTab}
          tabList={[
            {
              label: '예약 관리',
              content: <ReservationTab />,
            },
            {
              label: '좌석 정보',
              content: <SeatTab />,
            },
          ]}
        />
      </StyledSideBar>
      <RightWrap>
        <ShopContent />
      </RightWrap>
    </Wrap>
  );
};

export const RightWrap = styled.div`
  padding: 3rem 1.5rem;

  margin: auto;
  flex-direction: column;
`;
