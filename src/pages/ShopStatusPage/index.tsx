import { useTab } from 'common/hooks/useTab';
import { Tabs } from 'components/Tabs.tsx';
import { StyledSideBar } from 'pages/LayoutSettingPage/LayoutSettingPage.styled';
import { ReservationTab } from 'pages/ShopStatusPage/ReservationTab';
import { SeatTab } from 'pages/ShopStatusPage/SeatTab';
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
    </Wrap>
  );
};
