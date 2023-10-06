import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';
import type { Layout } from 'react-grid-layout';
import { useChangeStore } from 'pages/LayoutSettingPage/stores/changeStore';

interface LayoutStoreState {
  layout: CustomItemLayout[];
  actions: {
    clearLayout: () => void;
    getItem: (id: string) => CustomItemLayout;
    saveInitialLayout: (layout: CustomItemLayout[]) => void;
    saveLayoutChange: (changedLayout: Layout[]) => void;
    disableMove: () => void;
    enableMove: () => void;
    addItem: (item: CustomItemLayout) => void;
    deleteItem: (id: string) => void;
    setManageId: (itemId: string, value: number) => void;
    setTableSize: (id: string, value: number, size: 'w' | 'h') => void;
  };
}

/**
 * 좌석 배치 정보 관리
 */
const useLayoutStore = create<LayoutStoreState>()(
  devtools((set, get) => ({
    layout: [],
    actions: {
      clearLayout: () => set(() => ({ layout: [] })),
      getItem: (id: string) => {
        const finded = get().layout.find((item) => item.i === id);
        if (!finded) throw new Error('존재하지 않는 아이템입니다.');
        return finded;
      },
      setTableSize: (id: string, value: number, size: 'w' | 'h') => {
        set(
          (state) => {
            const copy = [...state.layout];
            const idx = copy.findIndex((item) => item.i === id);
            copy[idx][size] = value;
            return { layout: copy };
          },
          false,
          'setTableSize',
        );
      },
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
                // FIXME w가 왜 비어있는지 파악해야함
                w: changedLayout[idx]?.w,
                h: changedLayout[idx]?.h,
                x: changedLayout[idx]?.x,
                y: changedLayout[idx]?.y,
              };
            });
            return {
              layout: newLayout,
            };
          },
          false,
          'saveLayoutChange',
        ),
      setManageId: (itemId: string, value: number) => {
        set(
          (state) => {
            const copy = [...state.layout];
            for (let i = state.layout.length - 1; i >= 0; i--) {
              if (state.layout[i].i === itemId) {
                copy[i].manageId = value;
                break;
              }
            }
            useChangeStore.getState().setChange(true);

            return { layout: copy };
          },
          false,
          'setManageId',
        );
      },
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
