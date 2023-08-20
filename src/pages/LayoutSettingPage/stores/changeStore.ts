import { create } from 'zustand';

interface ChangeStoreState {
  isChanged: boolean;
  setChange: (bool: boolean) => void;
}

export const useChangeStore = create<ChangeStoreState>()((set) => ({
  isChanged: false,
  setChange: (bool) => set(() => ({ isChanged: bool })),
}));

export const useChange = () =>
  useChangeStore((state) => ({
    isChanged: state.isChanged,
    setChange: state.setChange,
  }));
