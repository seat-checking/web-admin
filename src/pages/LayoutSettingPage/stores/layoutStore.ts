import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CustomLayout } from 'pages/LayoutSettingPage/utils/types';
import type { Layout } from 'react-grid-layout';

interface LayoutStoreState {
  layout: CustomLayout[];
  actions: {
    saveLayout: (layout: CustomLayout[]) => void;
    saveLayoutChange: (changedLayout: Layout[]) => void;
    disableMove: () => void;
    enableMove: () => void;
    addItem: (item: CustomLayout) => void;
  };
}

const useLayoutStore = create<LayoutStoreState>()(
  devtools((set) => ({
    layout: [],
    actions: {
      addItem: (item: CustomLayout) =>
        set((state) => ({ layout: [...state.layout, item] }), false, 'addItem'),
      saveLayout: (layout: CustomLayout[]) =>
        set(() => ({ layout }), false, 'saveLayout'),
      saveLayoutChange: (changedLayout: Layout[]) =>
        set(
          (state) => {
            console.log(
              'state.layout, changedLayout :>> ',
              state.layout,
              changedLayout,
            );
            return {
              layout: state.layout.map((prevItem, idx) => ({
                ...prevItem,
                w: changedLayout[idx].w,
                h: changedLayout[idx].h,
                x: changedLayout[idx].x,
                y: changedLayout[idx].y,
              })),
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
