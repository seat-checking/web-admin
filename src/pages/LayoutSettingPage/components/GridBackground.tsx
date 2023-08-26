import { useContext, useRef, useState } from 'react';
import GridLayout from 'react-grid-layout';
import styled from 'styled-components/macro';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';

import type { Layout } from 'react-grid-layout';
import { ChairItem } from 'pages/LayoutSettingPage/components/ChairItem';

import { TableItem } from 'pages/LayoutSettingPage/components/TableItem';
import {
  useLayout,
  useLayoutActions,
} from 'pages/LayoutSettingPage/stores/layoutStore';
import { useSelectItem } from 'pages/LayoutSettingPage/stores/selectItemStore';
import { DragContext } from 'pages/LayoutSettingPage/utils/DragContext';
import {
  COLUMN_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

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
  const [isItemClicked, setIsItemClicked] = useState(false);
  const { selectedId, setSelectedId } = useSelectItem();

  const { size } = useContext(DragContext);

  const isMoved = useRef(false);
  const dragStartTime = useRef(0);

  const handleTogglePopover = (id: string) => {
    setIsItemClicked(!isItemClicked);
    setSelectedId(id);
  };

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
      handleTogglePopover(item.i);
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

  const handleDragStart = (event: MouseEvent, itemId: string) => {
    if (event.type !== 'mousedown') {
      return;
    }
    isMoved.current = false;
    dragStartTime.current = 0;
    setTimeout(() => {
      if (!isMoved.current) {
        handleTogglePopover(itemId);
      }
    }, 100);
  };

  const handleDrag = () => {
    isMoved.current = true;
    if (!dragStartTime.current) dragStartTime.current = Date.now();
  };

  const handleDragStop = (itemId: string) => {
    if (Date.now() - dragStartTime.current < 200) {
      handleTogglePopover(itemId);
    }
  };

  return (
    /* eslint-disable-line */
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
      onDragStart={(_l, item, _n, _p, event) => handleDragStart(event, item.i)}
      onDrag={handleDrag}
      onDragStop={(_l, item) => handleDragStop(item.i)}
    >
      {myLayout?.map((item) => {
        if (item.sort === 'chair') {
          return (
            <ChairItem
              key={item.i}
              id={item.i}
              isClickable={activeTab === 1}
              isChairClicked={isItemClicked && selectedId === item.i}
              onClose={() => setIsItemClicked(!isItemClicked)}
            />
          );
        }
        return (
          <TableItem
            key={item.i}
            id={item.i}
            isClickable={activeTab === 1}
            isTableClicked={isItemClicked && selectedId === item.i}
            onClose={() => setIsItemClicked(!isItemClicked)}
          />
        );
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
