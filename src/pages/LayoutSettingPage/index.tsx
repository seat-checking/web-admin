import { useEffect, useRef, useState } from 'react';
import type { TabItem } from 'components/Tabs.tsx';
import type { SpaceType } from 'pages/LayoutSettingPage/utils/types';
import type { Layout } from 'react-grid-layout';

import { Tabs } from 'components/Tabs.tsx';
import {
  ChairBorder,
  Chair,
  Wrap,
  ShopGridBackground,
  RightWrap,
  GridTable,
  StyledSideBar,
} from 'pages/LayoutSettingPage/LayoutSettingPage.styled';
import { SeatLayoutTab } from 'pages/LayoutSettingPage/components/SeatLayoutTab';
import { ShopLayoutTab } from 'pages/LayoutSettingPage/components/ShopLayoutTab';
import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';

import { SpaceRow } from 'pages/LayoutSettingPage/components/SpaceRow';
import {
  COLUMN_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

const tabList: TabItem[] = [
  { label: '가게 형태', content: <ShopLayoutTab /> },
  { label: '좌석 배치', content: <SeatLayoutTab /> },
];

interface MyLayout extends Layout {
  sort: 'chair' | 'table';
}
/**
 * 좌석 설정 페이지
 */
export const LayoutSettingPage: React.FC = () => {
  const [shopList, setShopList] = useState([]);
  const [mylayout, setmyLayout] = useState<MyLayout[]>([]);
  const [spaceList, setSpaceList] = useState<SpaceType[]>([]);

  const addSpace = () => {
    const newSpace: SpaceType = {
      storeSpaceId: Date.now(),
      name: 'Space',
    };
    setSpaceList([...spaceList, newSpace]);
  };

  const deleteSpace = (id: number) => {
    const deleted = spaceList.filter(({ storeSpaceId }) => storeSpaceId !== id);
    setSpaceList(deleted);
  };

  const itemsDom = mylayout.map((item) => {
    const sort = item.i.split('-')[0];
    if (sort === 'chair') {
      return (
        <ChairBorder key={item.i} className='chair clickable'>
          <Chair />
        </ChairBorder>
      );
    }
    return <GridTable key={item.i} />;
  });

  const idx = useRef(0);
  const handleDropItem = (
    myLayout: MyLayout[],
    item: MyLayout,
    e: DragEvent,
  ): void => {
    const sort = e.dataTransfer?.getData('sort');
    const width = Number(e.dataTransfer?.getData('width'));
    const height = Number(e.dataTransfer?.getData('height'));
    if (sort === 'chair') {
      item.isResizable = false;
      item.sort = 'chair';
      item.i = `chair-${idx.current++}`;
    } else {
      item.sort = 'table';
      item.i = `table-${idx.current++}`;
    }
    item.w = width;
    item.h = height;
    setmyLayout(myLayout);
  };

  useEffect(() => {
    const spaces = shopList.map(({ storeSpaceId, name }) => ({
      storeSpaceId,
      name,
    }));
    setSpaceList(spaces);
  }, [shopList]);

  return (
    <Wrap>
      <StyledSideBar>
        <Tabs tabList={tabList} />
      </StyledSideBar>
      <RightWrap>
        <SpaceRow
          spaceList={spaceList}
          addSpace={addSpace}
          deleteSpace={deleteSpace}
        />
        <ShopGridBackground
          className='layout mine clickable'
          layout={mylayout}
          rowHeight={TABLE_SIZE_PX}
          // width/cols = rowHeight가 나와야 정사각형 나옴
          cols={COLUMN_CNT}
          width={TABLE_SIZE_PX * COLUMN_CNT}
          $height={15 * TABLE_SIZE_PX}
          margin={[0, 0]}
          // 이게 없어야 배경색 보임, 드래그앤드롭 자유배치 가능
          autoSize={false}
          compactType={null}
          maxRows={15}
          // 이게 있어야 아이템이 이동시킬 때 다른 아이템이 움직이지 않음
          preventCollision
          isDroppable
          onDrop={handleDropItem}
        >
          {itemsDom}
        </ShopGridBackground>
      </RightWrap>
    </Wrap>
  );
};
