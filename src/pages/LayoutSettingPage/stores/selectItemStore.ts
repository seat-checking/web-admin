import { create } from 'zustand';

interface SelectItemStoreState {
  selectedId: string | null;
  setSelectedId: (id: string) => void;
}

export const useSelectItemStore = create<SelectItemStoreState>()((set) => ({
  selectedId: null,
  setSelectedId: (id: string) => set(() => ({ selectedId: id })),
}));

export const useSelectItem = () =>
  useSelectItemStore((state) => ({
    selectedId: state.selectedId,
    setSelectedId: state.setSelectedId,
  }));
