import { create } from 'zustand';

interface SelectItemStoreState {
  selectedItem: string | null;
  setSelectedItem: (id: string) => void;
}

export const useSelectItemStore = create<SelectItemStoreState>()((set) => ({
  selectedItem: null,
  setSelectedItem: (id: string) => set(() => ({ selectedItem: id })),
}));

export const useSelectItem = () =>
  useSelectItemStore((state) => ({
    selectedItem: state.selectedItem,
    setSelectedItem: state.setSelectedItem,
  }));
