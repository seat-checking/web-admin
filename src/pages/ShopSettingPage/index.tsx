import type { TabItem } from 'components/Tabs.tsx';
import { useTab } from 'common/hooks/useTab';
import { Tabs } from 'components/Tabs.tsx';

import { ApplicationTab } from 'pages/ShopSettingPage/components/ApplicationTab/ApplicationTab';
import { BusinessHourTab } from 'pages/ShopSettingPage/components/BusinessHourTab';
import { EmployerTab } from 'pages/ShopSettingPage/components/EmployerTab/EmployerTab';
import { ShopInfoTab } from 'pages/ShopSettingPage/components/ShopInfoTab';
import { ContentWrap, TabsWrap, Wrap } from 'pages/ShopSettingPage/styled';

const tabList: TabItem[] = [
  {
    label: '가게 정보 설정',
    content: <ShopInfoTab />,
  },
  {
    label: '영업 시간 설정',
    content: <BusinessHourTab />,
  },
  {
    label: '직원 권한 설정',
    content: <EmployerTab />,
  },
  {
    label: '이용 신청 설정',
    content: <ApplicationTab />,
  },
];
/**
 * 가게 설정 페이지
 */
export const ShopSettingPage: React.FC = () => {
  const { activeTab, changeTab } = useTab();

  return (
    <Wrap>
      <ContentWrap>
        <TabsWrap>
          <Tabs
            tabList={tabList}
            tabWidth='63rem'
            activeTab={activeTab}
            onClickTab={changeTab}
          />
        </TabsWrap>
      </ContentWrap>
    </Wrap>
  );
};
