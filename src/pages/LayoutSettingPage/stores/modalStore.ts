import { create } from 'zustand';

interface ModalStoreState {
  isAddOn: boolean;
  setIsAddOn: (boolean: boolean) => void;
}

export const useModalStore = create<ModalStoreState>()((set) => ({
  isAddOn: false,
  setIsAddOn: (boolean: boolean) => set({ isAddOn: boolean }),
}));

export const useModal = () =>
  useModalStore((state) => ({
    isAddOn: state.isAddOn,
    setIsAddOn: state.setIsAddOn,
  }));
