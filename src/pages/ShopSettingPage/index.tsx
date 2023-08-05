import type { TabItem } from 'components/Tabs.tsx';
import { useTab } from 'common/hooks/useTab';
import { Button } from 'components/Button';
import { Tabs } from 'components/Tabs.tsx';
import { BusinessHourTab } from 'pages/ShopSettingPage/components/BusinessHourTab';
import { EmployerTab } from 'pages/ShopSettingPage/components/EmployerTab/EmployerTab';
import { SettingSideBar } from 'pages/ShopSettingPage/components/SettingSideBar';
import { ShopInfoTab } from 'pages/ShopSettingPage/components/ShopInfoTab';
import { ContentWrap, HeaderWrap, Wrap } from 'pages/ShopSettingPage/styled';

const tabList: TabItem[] = [
  {
    label: '가게 정보 설정',
    content: <ShopInfoTab />,
  },
  {
    label: '운영 시간 설정',
    content: <BusinessHourTab />,
  },
  {
    label: '직원 권한 설정',
    content: <EmployerTab />,
  },
];
/**
 * 가게 설정 페이지
 */
export const ShopSettingPage: React.FC = () => {
  const { activeTab, changeTab } = useTab();

  return (
    <Wrap>
      <SettingSideBar />
      <ContentWrap>
        <HeaderWrap>
          <Tabs
            tabList={tabList}
            tabWidth='63rem'
            activeTab={activeTab}
            onClickTab={changeTab}
          />
          <Button
            width='7.6rem'
            height='3.6rem'
            borderRadius='0.6rem'
            type='button'
            style={{
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: '9.6rem',
              top: 'calc((6rem - 3.6rem )/2)',
              right: 0,
            }}
          >
            저장
          </Button>
        </HeaderWrap>
      </ContentWrap>
    </Wrap>
  );
};
