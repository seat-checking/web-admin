import { useState } from 'react';
import { ReactComponent as ChevronLeft } from 'assets/icons/chevron-left-bg-grey.svg';
import { ReactComponent as AnalyticsActive } from 'assets/icons/snb-analytics-active.svg';
import { ReactComponent as Analytics } from 'assets/icons/snb-analytics.svg';
import { ReactComponent as OverviewActive } from 'assets/icons/snb-overview-active.svg';
import { ReactComponent as Overview } from 'assets/icons/snb-overview.svg';
import { ReactComponent as SettingSeatActive } from 'assets/icons/snb-setting-seat-active.svg';
import { ReactComponent as SettingSeat } from 'assets/icons/snb-setting-seat.svg';
import { ReactComponent as SettingStoreActive } from 'assets/icons/snb-setting-store-active.svg';
import { ReactComponent as SettingStore } from 'assets/icons/snb-setting-store.svg';
import defaultShopImg from 'assets/images/default-shop.png';

import { usePermissions, useSelectedShop } from 'common/stores/authStore';
import { PATH } from 'common/utils/constants';
import {
  Blank,
  FoldBtn,
  Wrap,
} from 'components/DashboardLayout/components/GlobalNavigationBar.styled';
import { NavigationItem } from 'components/DashboardLayout/components/NavigationItem';
import { ShopDropdown } from 'components/DashboardLayout/components/ShopDropdown';

/**
 * 글로벌 사이드 네비게이션 바 컴포넌트
 */
export const GlobalNavigationBar: React.FC = () => {
  const [isFolded, setIsFolded] = useState<boolean>(false);

  const handleClickFoldBtn = () => {
    setIsFolded((prevState) => !prevState);
  };

  const selectedShop = useSelectedShop();

  const permissions = usePermissions();

  return (
    <>
      <Wrap folded={isFolded}>
        <img
          src={selectedShop?.mainImage || defaultShopImg}
          alt='가게 로고'
          className='shopLogo'
        />
        {!isFolded && <ShopDropdown isFolded={isFolded} />}
        <ul className='naviationList'>
          {permissions?.storeStatus && (
            <NavigationItem
              to='/'
              label='가게 현황'
              activeIcon={OverviewActive}
              defaultIcon={Overview}
              isFolded={isFolded}
            />
          )}
          {permissions?.seatSetting && (
            <NavigationItem
              to={`/${PATH.layout}`}
              label='좌석 설정'
              activeIcon={SettingSeatActive}
              defaultIcon={SettingSeat}
              isFolded={isFolded}
            />
          )}
          {permissions?.storeStatistics && (
            <NavigationItem
              to={`/${PATH.statistics}`}
              label='가게 통계'
              activeIcon={AnalyticsActive}
              defaultIcon={Analytics}
              isFolded={isFolded}
            />
          )}
          {permissions?.storeSetting && (
            <NavigationItem
              to={`/${PATH.setting}`}
              label='가게 설정'
              activeIcon={SettingStoreActive}
              defaultIcon={SettingStore}
              isFolded={isFolded}
            />
          )}
        </ul>
        <FoldBtn onClick={handleClickFoldBtn}>
          <ChevronLeft {...(isFolded && { transform: 'rotate(180)' })} />
        </FoldBtn>
      </Wrap>
      <Blank folded={isFolded} />
    </>
  );
};
