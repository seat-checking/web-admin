import { useContext, useState, forwardRef } from 'react';
import GridLayout from 'react-grid-layout';
import styled from 'styled-components/macro';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';
import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  Ref,
} from 'react';
import type { Layout } from 'react-grid-layout';

import {
  ChairComponent,
  TableComponent,
} from 'pages/LayoutSettingPage/components/Chair';
import { Popover } from 'pages/LayoutSettingPage/components/Popover';
import { PopoverGpt } from 'pages/LayoutSettingPage/components/PopoverGpt';
import {
  useLayout,
  useLayoutActions,
} from 'pages/LayoutSettingPage/stores/layoutStore';
import { DragContext } from 'pages/LayoutSettingPage/utils/DragContext';
import {
  CHAIR_BORDER_PX,
  CHAIR_SIZE_PX,
  COLUMN_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';
import { flexSet } from 'styles/mixin';

interface GridBackgroundProps {
  activeTab: number;
  rowCnt: number;
}

/**
 * 좌석 배치 영역
 */
export const GridBackground: React.FC<GridBackgroundProps> = ({
  activeTab,
  rowCnt,
}) => {
  const myLayout = useLayout();
  const { saveLayoutChange, addItem } = useLayoutActions();
  const { size } = useContext(DragContext);

  const handleDropDragOver = () => {
    return { ...size.current };
  };

  const handleDropItem = (
    _: Layout[],
    item: CustomItemLayout,
    e: DragEvent,
  ) => {
    const sort = e.dataTransfer?.getData('sort');
    const { w, h } = size.current;
    item.w = w;
    item.h = h;
    item.i = String(Date.now());
    if (sort === 'chair') {
      item.isResizable = false;
      item.sort = 'chair';
    } else {
      item.isResizable = true;
      item.sort = 'table';
    }
    addItem(item);
  };

  const handleLayoutChange = (layout: Layout[]) => {
    if (layout.at(-1)?.i === '__dropping-elem__') {
      return;
    }
    saveLayoutChange(layout);
  };

  return (
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
      {myLayout?.map((item) => {
        if (item.sort === 'chair') {
          return <ChairComponent key={item.i} isClickable={activeTab === 1} />;
        }
        return <TableComponent key={item.i} isClickable={activeTab === 1} />;
      })}
    </ShopGridBackground>
  );
};

const ShopGridBackground = styled(GridLayout)<{
  width: number;
  $height?: number;
}>`
  width: ${({ width }) => {
    return width + 'px';
  }};

  height: ${({ $height }) => $height + 'px'};
`;
