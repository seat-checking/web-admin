import { create } from 'zustand';
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

const useLayoutStore = create<LayoutStoreState>((set) => ({
  layout: [],
  actions: {
    addItem: (item: CustomLayout) =>
      set((state) => ({ layout: [...state.layout, item] })),

    saveLayout: (layout: CustomLayout[]) => set(() => ({ layout })),
    saveLayoutChange: (changedLayout: Layout[]) =>
      set((state) => ({
        layout: state.layout.map((prevItem, idx) => ({
          ...prevItem,
          ...changedLayout[idx],
        })),
      })),
    disableMove: () =>
      set((state) => {
        const result = state.layout.map((prevItem) => ({
          ...prevItem,
          isDraggable: false,
          isResizable: false,
        }));
        return {
          layout: result,
        };
      }),
    enableMove: () =>
      set((state) => {
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
      }),
  },
}));

export const useLayout = () => useLayoutStore((state) => state.layout);

export const useLayoutActions = () => useLayoutStore((state) => state.actions);
