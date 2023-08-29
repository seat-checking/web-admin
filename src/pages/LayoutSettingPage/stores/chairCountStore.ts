import create from 'zustand';

interface ChairCountStoreState {
  chairCount: number;
  actions: {
    increaseChairCount: () => void;
    decreaseChairCount: () => void;
    setChairCount: (value: number) => void;
  };
}

export const useChairCountStore = create<ChairCountStoreState>((set) => ({
  chairCount: 0,
  actions: {
    increaseChairCount: () =>
      set((state) => ({ chairCount: state.chairCount + 1 })),
    decreaseChairCount: () =>
      set((state) => {
        if (state.chairCount > 0) {
          return { chairCount: state.chairCount - 1 };
        }
        return state;
      }),
    setChairCount: (value: number) => set(() => ({ chairCount: value })),
  },
}));

export const useChairCount = () =>
  useChairCountStore((state) => state.chairCount);

export const useChairCountActions = () =>
  useChairCountStore((state) => state.actions);
