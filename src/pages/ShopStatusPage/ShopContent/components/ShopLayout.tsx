import type {
  CurrentlyInUseResponse,
  GetShopLayoutResponse,
} from 'api/shop/types';
import {
  Chair,
  ChairBorder,
  GridTable,
  GridWrap,
} from 'pages/ShopStatusPage/ShopContent/components/ShopLayout.styled';

interface ShopLayoutProps {
  layout: GetShopLayoutResponse | undefined;
  isLoading: boolean;
  inUse: CurrentlyInUseResponse;
}

/**
 * 가게 좌석 배치도 영역
 */

export const ShopLayout: React.FC<ShopLayoutProps> = ({ layout, inUse }) => {
  const isUsingNow = (chairId: number) =>
    inUse.allChairsCurrentlyInUse.findIndex(({ id }) => id === chairId) !== -1;

  const chairsDom = () => {
    return layout?.chairList.map((chair) => (
      <ChairBorder key={chair.i} x={chair.x} y={chair.y}>
        <Chair isUsing={isUsingNow(+chair.i)}>{chair.manageId}</Chair>
      </ChairBorder>
    ));
  };

  return (
    <GridWrap $height={layout?.height}>
      {layout?.tableList.map((table) => (
        <GridTable
          key={table.i}
          width={table.w}
          height={table.h}
          x={table.x}
          y={table.y}
        />
      ))}

      {chairsDom()}
    </GridWrap>
  );
};
