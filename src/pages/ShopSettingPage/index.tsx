import type { TabItem } from 'components/Tabs.tsx';
import { useGetShopInformation } from 'common/hooks/queries/useGetShopInformation';
import { useTab } from 'common/hooks/useTab';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { Tabs } from 'components/Tabs.tsx';

import { ApplicationTab } from 'pages/ShopSettingPage/components/ApplicationTab/ApplicationTab';
import { BusinessHourTab } from 'pages/ShopSettingPage/components/BusinessHourTab';
import { EmployerTab } from 'pages/ShopSettingPage/components/EmployerTab/EmployerTab';
import { ShopInfoTab } from 'pages/ShopSettingPage/components/ShopInfoTab';
import { ContentWrap, TabsWrap, Wrap } from 'pages/ShopSettingPage/styled';

/**
 * 가게 설정 페이지
 */
export const ShopSettingPage: React.FC = () => {
  const { activeTab, changeTab } = useTab();

  const { data: shopInformation } = useGetShopInformation();

  return (
    <Wrap>
      <ContentWrap>
        <TabsWrap>
          <Tabs
            tabList={[
              {
                label: '가게 정보 설정',
                content: shopInformation ? (
                  <ShopInfoTab shopInformation={shopInformation} />
                ) : (
                  <LoadingSpinner />
                ),
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
            ]}
            maxTabWidth='80rem'
            minTabWidth='60rem'
            activeTab={activeTab}
            onClickTab={changeTab}
          />
        </TabsWrap>
      </ContentWrap>
    </Wrap>
  );
};
