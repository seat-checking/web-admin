import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';
import type { Layout } from 'react-grid-layout';
import { useChangeStore } from 'pages/LayoutSettingPage/stores/changeStore';

interface LayoutStoreState {
  layout: CustomItemLayout[];
  actions: {
    clear: () => void;
    getItem: (id: string) => CustomItemLayout | undefined;
    saveInitialLayout: (layout: CustomItemLayout[]) => void;
    saveLayoutChange: (changedLayout: Layout[]) => void;
    disableMove: () => void;
    enableMove: () => void;
    addItem: (item: CustomItemLayout) => void;
    deleteItem: (id: string) => void;
  };
}

/**
 * 좌석 배치 정보 관리
 */
const useLayoutStore = create<LayoutStoreState>()(
  devtools((set, get) => ({
    layout: [],
    actions: {
      clear: () => set(() => ({ layout: [] })),
      getItem: (id: string) => get().layout.find((item) => item.i === id),
      addItem: (item: CustomItemLayout) => {
        useChangeStore.getState().setChange(true);
        set((state) => ({ layout: [...state.layout, item] }), false, 'addItem');
      },
      deleteItem: (id: string) => {
        useChangeStore.getState().setChange(true);
        set(
          (state) => ({ layout: state.layout.filter(({ i }) => i !== id) }),
          false,
          'deleteItem',
        );
      },
      saveInitialLayout: (layout: CustomItemLayout[]) =>
        set(() => ({ layout }), false, 'saveInitialLayout'),
      saveLayoutChange: (changedLayout: Layout[]) =>
        set(
          (state) => {
            if (!useChangeStore.getState().isChanged) {
              const isChanged = state.layout.find(
                (prevItem, idx) =>
                  changedLayout[idx].w !== prevItem.w ||
                  changedLayout[idx].h !== prevItem.h ||
                  changedLayout[idx].x !== prevItem.x ||
                  changedLayout[idx].y !== prevItem.y,
              );
              if (isChanged) {
                useChangeStore.getState().setChange(true);
              }
            }
            const newLayout = state.layout.map((prevItem, idx) => {
              return {
                ...prevItem,
                w: changedLayout[idx].w,
                h: changedLayout[idx].h,
                x: changedLayout[idx].x,
                y: changedLayout[idx].y,
              };
            });
            return {
              layout: newLayout,
            };
          },
          false,
          'saveLayoutChange',
        ),
      disableMove: () =>
        set(
          (state) => {
            const result = state.layout.map((prevItem) => ({
              ...prevItem,
              isDraggable: false,
              isResizable: false,
            }));
            return {
              layout: result,
            };
          },
          false,
          'disableMove',
        ),
      enableMove: () =>
        set(
          (state) => {
            const result = state.layout.map((prevItem) => {
              const draggable = { ...prevItem, isDraggable: true };
              if (prevItem.sort === 'table') {
                draggable.isResizable = true;
              }
              return draggable;
            });
            return {
              layout: result,
            };
          },
          false,
          'enableMove',
        ),
    },
  })),
);

export const useLayout = () => useLayoutStore((state) => state.layout);

export const useLayoutActions = () => useLayoutStore((state) => state.actions);
