import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ShopLayout } from 'api/lib/shop';
import type {
  CustomItemLayout,
  ItemType,
  ShopFormState,
} from 'pages/LayoutSettingPage/utils/types';
import type { SyntheticEvent } from 'react';
import type { Layout } from 'react-grid-layout';
import type { ResizeCallbackData } from 'react-resizable';

import { useGetSpaceLayout } from 'common/hooks/queries/useGetSpaceLayout';
import { useTab } from 'common/hooks/useTab';
import { Tabs } from 'components/Tabs.tsx';
import {
  ChairBorder,
  Chair,
  Wrap,
  ShopGridBackground,
  RightWrap,
  GridTable,
  StyledSideBar,
  ResizableWrap,
} from 'pages/LayoutSettingPage/LayoutSettingPage.styled';
import { SeatArrangementTab } from 'pages/LayoutSettingPage/components/SeatArrangementTab';
import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';

import { ShopFormTab } from 'pages/LayoutSettingPage/components/ShopFormTab';
import { SpaceRow } from 'pages/LayoutSettingPage/components/SpaceRow';
import { useShopHeight } from 'pages/LayoutSettingPage/hooks/useShopHeight';

import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import {
  useLayout,
  useLayoutActions,
} from 'pages/LayoutSettingPage/stores/layoutStore';
import { DragContext } from 'pages/LayoutSettingPage/utils/DragContext';
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

const itemsDom = (layout: CustomItemLayout[], activeTab: number) => {
  return layout.map((item) => {
    if (item.sort === 'chair') {
      return (
        <ChairBorder key={item.i} className='chair'>
          <Chair isClickable={activeTab === 1} />
        </ChairBorder>
      );
    }
    return <GridTable key={item.i} isClickable={activeTab === 1} />;
  });
};

/**
 * 좌석 설정 페이지
 */
export const LayoutSettingPage: React.FC = () => {
  const { spaceId } = useSpaceId();

  const { data: spaceLayout } = useGetSpaceLayout(spaceId);

  const { activeTab, changeTab } = useTab();
  const { rowCnt, minRowCnt, changeRowCnt, changeMinRowCnt, findMinRowCnt } =
    useShopHeight(DEFAULT_ROW_CNT);
  const { size } = useContext(DragContext);

  const [shopFormState, setShopFormState] =
    useState<ShopFormState>('RECTANGLE');
  const myLayout = useLayout();
  const {
    saveInitialLayout: saveLayout,
    saveLayoutChange,
    disableMove,
    enableMove,
    addItem,
  } = useLayoutActions();

  const handleResize = (e: SyntheticEvent, data: ResizeCallbackData) => {
    const { height } = data.size;
    changeRowCnt(height / TABLE_SIZE_PX);
    setShopFormState('NONE');
  };

  const handleDropDragOver = () => {
    return { ...size.current };
  };

  const handleDropItem = (
    layout: Layout[],
    item: CustomItemLayout,
    e: DragEvent,
  ) => {
    const sort = e.dataTransfer?.getData('sort');
    const { w, h } = size.current;
    item.w = w;
    item.h = h;
    if (sort === 'chair') {
      item.isResizable = false;
      item.sort = 'chair';
      item.i = String(Date.now());
    } else {
      item.isResizable = true;
      item.sort = 'table';
      item.i = String(Date.now());
    }
    addItem(item);
  };

  const handleLayoutChange = (layout: Layout[]) => {
    if (layout.at(-1)?.i === '__dropping-elem__') {
      return;
    }
    saveLayoutChange(layout);
  };

  useEffect(() => {
    changeMinRowCnt(findMinRowCnt(myLayout));
  }, [myLayout, changeMinRowCnt, findMinRowCnt]);

  useEffect(() => {
    if (activeTab === 0) {
      disableMove();
    }
    if (activeTab === 1) {
      enableMove();
    }
  }, [activeTab]);

  useEffect(() => {
    if (spaceLayout) {
      saveLayout(initialLayouts(spaceLayout));
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
            <ShopGridBackground
              layout={myLayout}
              rowHeight={TABLE_SIZE_PX}
              // width/cols = rowHeight가 나와야 정사각형 나옴
              cols={COLUMN_CNT}
              width={TABLE_SIZE_PX * COLUMN_CNT}
              $height={rowCnt * TABLE_SIZE_PX}
              margin={[0, 0]}
              // 이게 없어야 배경색 보임, 드래그앤드롭 자유배치 가능
              autoSize={false}
              compactType={null}
              maxRows={rowCnt}
              // 이게 있어야 아이템이 이동시킬 때 다른 아이템이 움직이지 않음
              preventCollision
              isDroppable
              isDraggable={false}
              isResizable={false}
              onDrop={handleDropItem}
              onDropDragOver={handleDropDragOver}
              onLayoutChange={handleLayoutChange}
            >
              {itemsDom(myLayout, activeTab)}
            </ShopGridBackground>
          </ResizableWrap>
        ) : (
          <ResizableWrap as='div' $width={TABLE_SIZE_PX * COLUMN_CNT}>
            <ShopGridBackground
              layout={myLayout}
              rowHeight={TABLE_SIZE_PX}
              cols={COLUMN_CNT}
              width={TABLE_SIZE_PX * COLUMN_CNT}
              $height={rowCnt * TABLE_SIZE_PX}
              margin={[0, 0]}
              autoSize={false}
              compactType={null}
              maxRows={rowCnt}
              preventCollision
              isDroppable
              onDrop={handleDropItem}
              onDropDragOver={handleDropDragOver}
              onLayoutChange={handleLayoutChange}
            >
              {itemsDom(myLayout, activeTab)}
            </ShopGridBackground>
          </ResizableWrap>
        )}
      </RightWrap>
    </Wrap>
  );
};
