import { useContext } from 'react';
import GridLayout from 'react-grid-layout';
import styled from 'styled-components/macro';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';
import type { Layout } from 'react-grid-layout';

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

const layoutToDom = (layout: CustomItemLayout[], activeTab: number) => {
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
      {layoutToDom(myLayout, activeTab)}
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

export const GridTable = styled.div<{ isClickable: boolean }>`
  background-color: ${(props): string => props.theme.palette.grey[100]};

  border-color: ${({ theme }) => theme.palette.black.main};
  border-width: 1px;
  border-style: solid;

  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;

// 의자 바깥에 투명한 테두리를 넣기 위함
export const ChairBorder = styled.div`
  ${flexSet()}
`;

// 검정 테두리를 준 의자 영역
export const Chair = styled.div<{ isClickable: boolean }>`
  background-color: ${(props): string => props.theme.palette.grey[100]};

  width: ${CHAIR_SIZE_PX - CHAIR_BORDER_PX}px;
  height: ${CHAIR_SIZE_PX - CHAIR_BORDER_PX}px;

  border: ${CHAIR_BORDER_PX}px solid ${({ theme }) => theme.palette.black.main};
  border-radius: 50%;

  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;
