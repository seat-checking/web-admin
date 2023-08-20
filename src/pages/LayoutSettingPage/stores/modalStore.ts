import { create } from 'zustand';

interface ModalStoreState {
  isConfirmOn: boolean;
  setIsConfirmOn: (boolean: boolean) => void;
  isAddOn: boolean;
  setIsAddOn: (boolean: boolean) => void;
}

export const useModalStore = create<ModalStoreState>()((set) => ({
  isConfirmOn: false,
  setIsConfirmOn: (boolean: boolean) => set({ isConfirmOn: boolean }),
  isAddOn: false,
  setIsAddOn: (boolean: boolean) => set({ isAddOn: boolean }),
}));

export const useModal = () =>
  useModalStore((state) => ({
    isConfirmOn: state.isConfirmOn,
    setIsConfirmOn: state.setIsConfirmOn,
    isAddOn: state.isAddOn,
    setIsAddOn: state.setIsAddOn,
  }));
