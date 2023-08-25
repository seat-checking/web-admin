import { useEffect, useState } from 'react';
import type { Shop } from 'common/utils/types';
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

import { getPermission } from 'common/utils/auth';
import { PATH, STORAGE } from 'common/utils/constants';
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

  const defaultSelectedShop: Shop = {
    storeId: Number(localStorage.getItem(STORAGE.storeId)),
    storeName: localStorage.getItem(STORAGE.storeName) || '',
    mainImage: localStorage.getItem(STORAGE.mainImage) || '',
    introduction: localStorage.getItem(STORAGE.introduction) || '',
  };

  const [selectedShop, setSelectedShop] = useState<Shop>(defaultSelectedShop);

  useEffect(() => {
    localStorage.setItem(STORAGE.storeId, selectedShop.storeId.toString());

    // storeId 외 정보는 새로고침 하기 전에만 저장시킴
    const saveShopInformation = () => {
      localStorage.setItem(
        STORAGE.introduction,
        selectedShop.introduction || '',
      );
      localStorage.setItem(STORAGE.mainImage, selectedShop.mainImage || '');
      localStorage.setItem(STORAGE.storeName, selectedShop.storeName);
    };
    window.addEventListener('beforeunload', saveShopInformation);
    return () => {
      window.removeEventListener('beforeunload', saveShopInformation);
    };
  }, [selectedShop]);

  return (
    <>
      <Wrap folded={isFolded}>
        <img
          src={selectedShop.mainImage || defaultShopImg}
          alt='가게 로고'
          className='shopLogo'
        />
        {!isFolded && (
          <ShopDropdown
            isFolded={isFolded}
            selectedShop={selectedShop}
            setSelectedShop={setSelectedShop}
          />
        )}
        <p className='branchName hideFold'>{selectedShop.introduction}</p>
        <ul className='naviationList'>
          {getPermission('storeStatus') && (
            <NavigationItem
              to='/'
              label='가게 현황'
              activeIcon={OverviewActive}
              defaultIcon={Overview}
              isFolded={isFolded}
            />
          )}
          {getPermission('seatSetting') && (
            <NavigationItem
              to={`/${PATH.layout}`}
              label='좌석 설정'
              activeIcon={SettingSeatActive}
              defaultIcon={SettingSeat}
              isFolded={isFolded}
            />
          )}
          {getPermission('storeStatistics') && (
            <NavigationItem
              to={`/${PATH.statistics}`}
              label='가게 통계'
              activeIcon={AnalyticsActive}
              defaultIcon={Analytics}
              isFolded={isFolded}
            />
          )}
          {getPermission('storeSetting') && (
            <NavigationItem
              to={`/${PATH.setting}/1`}
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
