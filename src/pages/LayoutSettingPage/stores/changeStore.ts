import { create } from 'zustand';

interface ChangeStoreState {
  isChanged: boolean;
  setChangeTrue: () => void;
}

export const useChangeStore = create<ChangeStoreState>()((set) => ({
  isChanged: false,
  setChangeTrue: () => set(() => ({ isChanged: true })),
}));

export const useChange = () =>
  useChangeStore((state) => ({
    isChanged: state.isChanged,
    setChangeTrue: state.setChangeTrue,
  }));
