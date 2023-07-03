import styled from 'styled-components/macro';
import type { TabItem } from 'components/Tabs.tsx';
import { SideBar } from 'components/SideBar';
import { Tabs } from 'components/Tabs.tsx';
import { SeatLayoutTab } from 'pages/LayoutSettingPage/components/SeatLayoutTab';
import { ShopLayoutTab } from 'pages/LayoutSettingPage/components/ShopLayoutTab';

const tabList: TabItem[] = [
  { label: '가게 형태', content: <ShopLayoutTab /> },
  { label: '좌석 배치', content: <SeatLayoutTab /> },
];
/**
 * 좌석 설정 페이지
 */
export const LayoutSettingPage: React.FC = () => {
  return (
    <div>
      <StyledSideBar>
        <Tabs tabList={tabList} />
      </StyledSideBar>
    </div>
  );
};

const StyledSideBar = styled(SideBar)`
  padding-top: 6rem;
`;
