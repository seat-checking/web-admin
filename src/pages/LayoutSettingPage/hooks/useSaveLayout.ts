import { useQueryClient } from '@tanstack/react-query';
import type { ReservationUnit, ShopLayout } from 'api/shop/types';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';
import { useCreateSpace } from 'common/hooks/mutations/useCreateSpace';
import { useEditLayout } from 'common/hooks/mutations/useEditLayout';
import { useSelectedShop } from 'common/stores/authStore';
import { TEMPORARY_SPACE_ID, queryKeys } from 'common/utils/constants';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';
import { useLayout } from 'pages/LayoutSettingPage/stores/layoutStore';
import { useShopHeight } from 'pages/LayoutSettingPage/stores/shopHeightStore';
import {
  useReservationUnit,
  useSpaceName,
} from 'pages/LayoutSettingPage/stores/spaceInfoStore';

export const convertDataForServer = (
  layout: CustomItemLayout[],
  height: number,
  storeSpaceName: string,
  reservationUnit: ReservationUnit,
) => {
  const request: ShopLayout = {
    storeSpaceName,
    height,
    reservationUnit,
    tableList: [],
    chairList: [],
  };
  layout.forEach(({ i, w, h, x, y, sort, manageId }) => {
    if (sort === 'table') {
      request.tableList.push({
        i,
        w,
        h,
        x,
        y,
      });
    } else {
      request.chairList.push({
        i,
        manageId,
        x,
        y,
      });
    }
  });
  return request;
};

export const useSaveLayout = () => {
  const height = useShopHeight();
  const layout = useLayout();
  const queryClient = useQueryClient();
  const { setChange } = useChange();

  const { mutate: editLayoutMutate } = useEditLayout();
  const { mutate: createSpaceMutate } = useCreateSpace();

  const { storeId: shopId } = useSelectedShop();
  const { spaceId } = useSpaceId();
  const spaceName = useSpaceName();
  const reservationUnit = useReservationUnit();

  const handleSave = () => {
    if (!shopId) return;
    queryClient.invalidateQueries([queryKeys.GET_SPACES, shopId]);
    if (spaceId === TEMPORARY_SPACE_ID) {
      createSpaceMutate({
        layout: convertDataForServer(
          layout,
          height,
          spaceName,
          reservationUnit,
        ),
        shopId,
      });
      return;
    }
    editLayoutMutate({
      spaceId,
      layout: convertDataForServer(layout, height, spaceName, reservationUnit),
    });
    setChange(false);
  };

  return handleSave;
};
