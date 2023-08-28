import { create } from 'zustand';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';
import { DEFAULT_ROW_CNT } from 'pages/LayoutSettingPage/utils/constants';
import { getValidHeight } from 'pages/LayoutSettingPage/utils/functions';

export type ChangeRowCommand = 'UP' | 'DOWN';

interface ShopHeightStoreState {
  height: number;
  actions: {
    changeHeight: (value: number | ChangeRowCommand, minHeight: number) => void;
    // changeMinHeight: (height: number) => void;
  };
}

export const useShopHeightStore = create<ShopHeightStoreState>()(
  (set, get) => ({
    height: DEFAULT_ROW_CNT,
    actions: {
      changeHeight: (value: number | ChangeRowCommand, minHeight: number) =>
        set(() => {
          if (value === 'UP') {
            return { height: get().height + 1 };
          }
          if (value === 'DOWN') {
            return { height: getValidHeight(get().height - 1, minHeight) };
          }
          return { height: getValidHeight(value, minHeight) };
        }),
      //   changeMinHeight: (height: number) => set(() => ({ minHeight: height })),
    },
  }),
);

export const useShopHeight = () => useShopHeightStore((state) => state.height);

export const useShopHeightActions = () =>
  useShopHeightStore((state) => state.actions);
