import { useContext, useEffect, useRef, useState } from 'react';
import type { ShopFormState } from 'pages/LayoutSettingPage/utils/types';
import type { SyntheticEvent } from 'react';
import type { Layout } from 'react-grid-layout';
import type { ResizeCallbackData } from 'react-resizable';

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
import { useSpace } from 'pages/LayoutSettingPage/hooks/useSpace';
import { DragContext } from 'pages/LayoutSettingPage/utils/DragContext';
import {
  COLUMN_CNT,
  DEFAULT_ROW_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

export interface MyLayout extends Layout {
  sort: 'chair' | 'table';
}
/**
 * 좌석 설정 페이지
 */
export const LayoutSettingPage: React.FC = () => {
  const { activeTab, changeTab } = useTab();
  const { setSpaces } = useSpace();
  const { rowCnt, minRowCnt, changeRowCnt, changeMinRowCnt, findMinRowCnt } =
    useShopHeight(DEFAULT_ROW_CNT);
  const { size } = useContext(DragContext);

  const [shopFormState, setShopFormState] =
    useState<ShopFormState>('RECTANGLE');
  const [shopList, setShopList] = useState([]);
  const [layouts, setLayouts] = useState<MyLayout[]>([]);

  const itemIndex = useRef(0);

  const itemsDom = layouts.map((item) => {
    const sort = item.i.split('-')[0];
    if (sort === 'chair') {
      return (
        <ChairBorder key={item.i} className='chair'>
          <Chair />
        </ChairBorder>
      );
    }
    return <GridTable key={item.i} />;
  });

  const handleResize = (e: SyntheticEvent, data: ResizeCallbackData) => {
    const { height } = data.size;
    changeRowCnt(height / TABLE_SIZE_PX);
    setShopFormState('NONE');
  };

  const handleDropDragOver = () => {
    return { ...size.current };
  };

  const handleDropItem = (
    myLayout: MyLayout[],
    item: MyLayout,
    e: DragEvent,
  ): void => {
    const sort = e.dataTransfer?.getData('sort');
    const { w, h } = size.current;
    item.w = w;
    item.h = h;
    if (sort === 'chair') {
      item.isResizable = false;
      item.sort = 'chair';
      item.i = `chair-${itemIndex.current++}`;
    } else {
      item.isResizable = true;
      item.sort = 'table';
      item.i = `table-${itemIndex.current++}`;
    }
    setLayouts(myLayout);
  };

  const handleLayoutChange = (layout: MyLayout[]) => {
    if (layout.at(-1)?.i === '__dropping-elem__') {
      return;
    }

    setLayouts(layout);
  };

  useEffect(() => {
    changeMinRowCnt(findMinRowCnt(layouts));
  }, [layouts, changeMinRowCnt, findMinRowCnt]);

  useEffect(() => {
    const spaces = shopList.map(({ storeSpaceId, name }) => ({
      storeSpaceId,
      name,
    }));
    setSpaces(spaces);
  }, [shopList, setSpaces]);

  useEffect(() => {
    if (activeTab === 0) {
      setLayouts((prev) =>
        prev.map((item) => {
          const result = { ...item, isDraggable: false };
          if (item.i.split('-')[0] === 'table') {
            result.isResizable = false;
          }
          return result;
        }),
      );
      return;
    }
    if (activeTab === 1) {
      setLayouts((prev) =>
        prev.map((item) => {
          const result = { ...item, isDraggable: true };
          if (item.i.split('-')[0] === 'table') {
            result.isResizable = true;
          }
          return result;
        }),
      );
    }
  }, [activeTab]);

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
            height={rowCnt * TABLE_SIZE_PX}
            resizeHandles={['s']}
            draggableOpts={{
              grid: [TABLE_SIZE_PX, TABLE_SIZE_PX],
            }}
            minConstraints={[
              TABLE_SIZE_PX,
              minRowCnt * TABLE_SIZE_PX || TABLE_SIZE_PX * 2,
            ]}
            axis={undefined}
            onResize={handleResize}
          >
            <ShopGridBackground
              layout={layouts}
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
              onDrop={handleDropItem}
              onDropDragOver={handleDropDragOver}
              onLayoutChange={handleLayoutChange}
            >
              {itemsDom}
            </ShopGridBackground>
          </ResizableWrap>
        ) : (
          <ResizableWrap as='div' $width={TABLE_SIZE_PX * COLUMN_CNT}>
            <ShopGridBackground
              layout={layouts}
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
              {itemsDom}
            </ShopGridBackground>
          </ResizableWrap>
        )}
      </RightWrap>
    </Wrap>
  );
};
