import type { GetShopLayoutResponse } from 'api/shop/types';
import {
  Chair,
  ChairBorder,
  GridTable,
  GridWrap,
} from 'pages/ShopStatusPage/ShopContent/components/ShopLayout.styled';

interface ShopLayoutProps {
  layout: GetShopLayoutResponse | undefined;
  isLoading: boolean;
}

/**
 * 가게 좌석 배치도 영역
 */

export const ShopLayout: React.FC<ShopLayoutProps> = ({ layout }) => {
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

      {layout?.chairList.map((chair) => (
        <ChairBorder key={chair.i} x={chair.x} y={chair.y}>
          <Chair>{chair.manageId}</Chair>
        </ChairBorder>
      ))}
    </GridWrap>
  );
};
