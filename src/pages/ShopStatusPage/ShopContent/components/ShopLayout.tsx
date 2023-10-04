import { useRef, useState } from 'react';
import type {
  CurrentlyInUseResponse,
  GetShopLayoutResponse,
} from 'api/shop/types';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { CheckOutConfirmModal } from 'pages/ShopStatusPage/ShopContent/components/CheckOutConfirmModal';
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

export const ShopLayout: React.FC<ShopLayoutProps> = ({
  layout,
  inUse,
  isLoading,
}) => {
  const isUsingNow = (chairId: number) =>
    inUse.allChairsCurrentlyInUse.findIndex(({ id }) => id === chairId) !== -1;

  const [selectedChair, setSelectedChair] = useState<null | number>(null);
  const selectedManageId = useRef<null | number>(null);

  const handleCloseModal = () => {
    setSelectedChair(null);
  };
  const handleOpenModal = (chairId: string, manageId: number | undefined) => {
    setSelectedChair(+chairId);
    if (typeof manageId === 'number') {
      selectedManageId.current = manageId;
    }
  };

  const chairsDom = () => {
    return layout?.chairList.map((chair) => {
      const isChairUsingNow = isUsingNow(+chair.i);
      return (
        <ChairBorder key={chair.i} x={chair.x} y={chair.y}>
          <Chair
            isUsing={isChairUsingNow}
            // TODO api 수정 후 ! 뺴야함
            onClick={() =>
              !isChairUsingNow && handleOpenModal(chair.i, chair.manageId)
            }
          >
            {chair.manageId}
          </Chair>
        </ChairBorder>
      );
    });
  };

  return (
    <>
      <GridWrap $height={layout?.height}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
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
          </>
        )}
      </GridWrap>
      {selectedChair !== null && (
        <CheckOutConfirmModal
          onClose={handleCloseModal}
          selectedChairId={selectedChair}
          selectedManageId={selectedManageId.current}
        />
      )}
    </>
  );
};
