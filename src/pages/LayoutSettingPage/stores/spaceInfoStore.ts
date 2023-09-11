import { create } from 'zustand';
import type { ReservationUnit } from 'api/shop/types';

interface SpaceInfoStoreState {
  spaceName: string;
  reservationUnit: ReservationUnit;
  actions: {
    setSpaceName: (spaceName: string) => void;
    setReservationUnit: (reservationUnit: ReservationUnit) => void;
    clear: () => void;
  };
}

export const useSpaceInfoStore = create<SpaceInfoStoreState>()((set) => ({
  spaceName: '',
  reservationUnit: { chair: true, space: false },
  actions: {
    setSpaceName: (name: string) => set(() => ({ spaceName: name })),
    setReservationUnit: (unit: ReservationUnit) =>
      set(() => ({ reservationUnit: unit })),
    clear: () =>
      set(() => ({
        reservationUnit: { chair: true, space: false },
        spaceName: '',
      })),
  },
}));

export const useSpaceName = () => useSpaceInfoStore((state) => state.spaceName);

export const useReservationUnit = () =>
  useSpaceInfoStore((state) => state.reservationUnit);

export const useSpaceInfoActions = () =>
  useSpaceInfoStore((state) => state.actions);
