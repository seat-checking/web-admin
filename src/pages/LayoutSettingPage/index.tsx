import { useEffect, useState } from 'react';
import type { ShopLayout } from 'api/shop/types';
import type {
  ItemType,
  ShopFormState,
} from 'pages/LayoutSettingPage/utils/types';
import type { SyntheticEvent } from 'react';
import type { ResizeCallbackData } from 'react-resizable';

import { useGetSpaceLayout } from 'common/hooks/queries/useGetSpaceLayout';
import { useTab } from 'common/hooks/useTab';
import { NO_SPACE_ID } from 'common/utils/constants';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { Tabs } from 'components/Tabs.tsx';
import {
  Wrap,
  RightWrap,
  StyledSideBar,
  ResizableWrap,
  GridWrap,
} from 'pages/LayoutSettingPage/LayoutSettingPage.styled';
import { GridBackground } from 'pages/LayoutSettingPage/components/GridBackground';
import { SeatArrangementTab } from 'pages/LayoutSettingPage/components/SeatArrangementTab';
import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';

import { ShopFormTab } from 'pages/LayoutSettingPage/components/ShopFormTab';
import { SpaceRow } from 'pages/LayoutSettingPage/components/SpaceRow';
import { useShopMinHeight } from 'pages/LayoutSettingPage/hooks/useShopHeight';

import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChairCountActions } from 'pages/LayoutSettingPage/stores/chairCountStore';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';
import {
  useLayout,
  useLayoutActions,
} from 'pages/LayoutSettingPage/stores/layoutStore';

import {
  useShopHeight,
  useShopHeightActions,
} from 'pages/LayoutSettingPage/stores/shopHeightStore';
import { useSpaceInfoActions } from 'pages/LayoutSettingPage/stores/spaceInfoStore';
import {
  COLUMN_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

/**
 * 좌석 설정 페이지
 */
export const LayoutSettingPage: React.FC = () => {
  const { spaceId } = useSpaceId();

  const { setChange, isChanged } = useChange();

  const { data: spaceLayout, isInitialLoading: isLayoutInitialLoading } =
    useGetSpaceLayout(spaceId);

  const { activeTab, changeTab } = useTab();
  const { minRowCnt, changeMinRowCnt, findMinRowCnt } = useShopMinHeight();
  const shopHeight = useShopHeight();
  const { setChairCount } = useChairCountActions();
  const { changeHeight, clearHeight } = useShopHeightActions();
  const { setSpaceName, setReservationUnit } = useSpaceInfoActions();

  const [shopFormState, setShopFormState] =
    useState<ShopFormState>('RECTANGLE');
  const myLayout = useLayout();
  const {
    saveInitialLayout: saveLayout,
    disableMove,
    enableMove,
    clearLayout,
  } = useLayoutActions();

  const isSideBarDisabled = spaceId === NO_SPACE_ID;

  const handleResize = (e: SyntheticEvent, data: ResizeCallbackData) => {
    const { height } = data.size;
    changeHeight(height / TABLE_SIZE_PX, minRowCnt);
    setChange(true);

    setShopFormState('NONE');
  };

  useEffect(() => {
    changeMinRowCnt(findMinRowCnt(myLayout));
  }, [myLayout, changeMinRowCnt, findMinRowCnt]);

  useEffect(() => {
    changeTab(0);
  }, [spaceId, changeTab]);

  useEffect(() => {
    if (activeTab === 0) {
      disableMove();
    }
    if (activeTab === 1) {
      enableMove();
    }
  }, [activeTab, disableMove, enableMove]);

  useEffect(() => {
    if (spaceLayout) {
      saveLayout(initialLayouts(spaceLayout));
      setSpaceName(spaceLayout.storeSpaceName);
      setReservationUnit(spaceLayout.reservationUnit);
      changeHeight(spaceLayout.height, minRowCnt);
      setChairCount(spaceLayout.chairList.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaceLayout, saveLayout]); // FIXME changeRowCnt 추가

  useEffect(() => {
    if (isChanged) {
      const handleUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = ''; // for chrome
      };

      window.addEventListener('beforeunload', handleUnload);

      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
  }, [isChanged]);

  useEffect(() => {
    return () => {
      clearLayout();
      clearHeight();
    };
  }, [clearLayout, clearHeight]);

  return (
    <Wrap>
      <StyledSideBar>
        <Tabs
          activeTab={activeTab}
          tabList={[
            {
              label: '가게 형태',
              content: (
                <ShopFormTab
                  minRowCnt={minRowCnt}
                  changeTab={changeTab}
                  shopFormState={shopFormState}
                  setShopFormState={setShopFormState}
                  isDisabled={isSideBarDisabled}
                />
              ),
            },
            {
              label: '좌석 배치',
              content: <SeatArrangementTab changeTab={changeTab} />,
            },
          ]}
        />
      </StyledSideBar>
      <RightWrap>
        <SpaceRow />
        {activeTab === 0 ? (
          <ResizableWrap
            width={TABLE_SIZE_PX * COLUMN_CNT}
            height={shopHeight * TABLE_SIZE_PX}
            resizeHandles={['s']}
            draggableOpts={{
              grid: [TABLE_SIZE_PX, TABLE_SIZE_PX],
            }}
            minConstraints={[
              TABLE_SIZE_PX,
              minRowCnt * TABLE_SIZE_PX || TABLE_SIZE_PX * 2,
            ]}
            maxConstraints={[1000, TABLE_SIZE_PX * COLUMN_CNT]}
            axis={undefined}
            onResize={handleResize}
          >
            {isLayoutInitialLoading ? (
              <LoadingSpinner />
            ) : (
              <GridBackground activeTab={activeTab} />
            )}
          </ResizableWrap>
        ) : (
          <GridWrap $width={TABLE_SIZE_PX * COLUMN_CNT}>
            <GridBackground activeTab={activeTab} />
          </GridWrap>
        )}
      </RightWrap>
    </Wrap>
  );
};

const initialLayouts = (shop: ShopLayout) => {
  const tables = shop?.tableList.map(({ i, x, y, w, h }) => {
    return {
      i: i + 't',
      x,
      y,
      w,
      h,
      sort: 'table' as ItemType,
      isResizable: false,
      isDraggable: false,
    };
  });
  const chairs = shop?.chairList.map(({ i, x, y, manageId }) => {
    return {
      i: String(i),
      x,
      y,
      w: 1,
      h: 1,
      sort: 'chair' as ItemType,
      manageId,
      isResizable: false,
      isDraggable: false,
    };
  });
  return [...tables, ...chairs];
};
