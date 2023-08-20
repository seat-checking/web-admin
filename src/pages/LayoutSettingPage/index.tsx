import { useEffect, useState } from 'react';
import type { ShopLayout } from 'api/lib/shop';
import type {
  ItemType,
  ReservationUnit,
  ShopFormState,
} from 'pages/LayoutSettingPage/utils/types';
import type { SyntheticEvent } from 'react';
import type { Layout } from 'react-grid-layout';
import type { ResizeCallbackData } from 'react-resizable';

import { useGetSpaceLayout } from 'common/hooks/queries/useGetSpaceLayout';
import { useTab } from 'common/hooks/useTab';
import { Tabs } from 'components/Tabs.tsx';
import {
  Wrap,
  RightWrap,
  StyledSideBar,
  ResizableWrap,
} from 'pages/LayoutSettingPage/LayoutSettingPage.styled';
import { GridBackground } from 'pages/LayoutSettingPage/components/GridBackground';
import { SeatArrangementTab } from 'pages/LayoutSettingPage/components/SeatArrangementTab';
import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';

import { ShopFormTab } from 'pages/LayoutSettingPage/components/ShopFormTab';
import { SpaceRow } from 'pages/LayoutSettingPage/components/SpaceRow';
import { useShopHeight } from 'pages/LayoutSettingPage/hooks/useShopHeight';

import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';
import {
  useLayout,
  useLayoutActions,
} from 'pages/LayoutSettingPage/stores/layoutStore';
import { useSpaceInfoActions } from 'pages/LayoutSettingPage/stores/spaceInfoStore';
import {
  COLUMN_CNT,
  DEFAULT_ROW_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

const initialLayouts = (shop: ShopLayout) => {
  const tables = shop?.tableList.map((table) => {
    return {
      i: table.storeTableId,
      x: table.tableX,
      y: table.tableY,
      w: table.width,
      h: table.height,
      sort: 'table' as ItemType,
      isResizable: false,
      isDraggable: false,
    };
  });
  const chairs = shop?.chairList.map((chair) => {
    return {
      i: chair.storeChairId,
      x: chair.chairX,
      y: chair.chairY,
      w: 1,
      h: 1,
      sort: 'chair' as ItemType,
      manageId: chair.manageId,
      isResizable: false,
      isDraggable: false,
    };
  });
  return [...tables, ...chairs];
};

const parseReservationUnitString = (unit: string) => {
  const reservationUnit: ReservationUnit = { seat: true, space: true };
  if (unit === '좌석') {
    reservationUnit.space = false;
  }
  if (unit === '스페이스') {
    reservationUnit.seat = false;
  }
  return reservationUnit;
};

/**
 * 좌석 설정 페이지
 */
export const LayoutSettingPage: React.FC = () => {
  const { spaceId } = useSpaceId();
  const { setChange } = useChange();

  const { data: spaceLayout } = useGetSpaceLayout(spaceId);

  const { activeTab, changeTab } = useTab();
  const { rowCnt, minRowCnt, changeRowCnt, changeMinRowCnt, findMinRowCnt } =
    useShopHeight(DEFAULT_ROW_CNT);
  const { setSpaceName, setReservationUnit } = useSpaceInfoActions();

  const [shopFormState, setShopFormState] =
    useState<ShopFormState>('RECTANGLE');
  const myLayout = useLayout();
  const {
    saveInitialLayout: saveLayout,
    disableMove,
    enableMove,
  } = useLayoutActions();

  const handleResize = (e: SyntheticEvent, data: ResizeCallbackData) => {
    const { height } = data.size;
    changeRowCnt(height / TABLE_SIZE_PX);
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
      setReservationUnit(
        parseReservationUnitString(spaceLayout.reservationUnit),
      );
      changeRowCnt(spaceLayout.height);
    }
  }, [spaceLayout, saveLayout]); // FIXME changeRowCnt 추가

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
                  changeRowCnt={changeRowCnt}
                  rowCnt={rowCnt}
                  minRowCnt={minRowCnt}
                  changeTab={changeTab}
                  shopFormState={shopFormState}
                  setShopFormState={setShopFormState}
                />
              ),
            },
            {
              label: '좌석 배치',
              content: (
                <SeatArrangementTab changeTab={changeTab} rowCnt={rowCnt} />
              ),
            },
          ]}
        />
      </StyledSideBar>
      <RightWrap>
        <SpaceRow />
        {activeTab === 0 ? (
          <ResizableWrap
            width={TABLE_SIZE_PX * COLUMN_CNT}
            height={rowCnt * TABLE_SIZE_PX}
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
            <GridBackground rowCnt={rowCnt} activeTab={activeTab} />
          </ResizableWrap>
        ) : (
          <ResizableWrap as='div' $width={TABLE_SIZE_PX * COLUMN_CNT}>
            <GridBackground rowCnt={rowCnt} activeTab={activeTab} />
          </ResizableWrap>
        )}
      </RightWrap>
    </Wrap>
  );
};
