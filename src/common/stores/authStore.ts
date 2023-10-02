import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE } from 'common/utils/constants';

export interface Permission {
  storeStatus: boolean;
  storeSetting: boolean;
  storeStatistics: boolean;
  seatSetting: boolean;
}

export interface ShopInformation {
  storeId: number | null;
  storeName: string | null;
  mainImage: string | null;
  introduction: string | null;
}

interface AuthStoreState {
  accessToken: string | null;
  selectedShop: ShopInformation;
  permissions: Permission | null;
  actions: {
    getAccessToken: () => string | null;
    getSelectedShop: () => ShopInformation | null;
    getPermissions: () => Permission | null;
    setAccessToken: (newAccessToken: string) => void;
    setSelectedShop: (shopInformation: ShopInformation) => void;
    setPermissions: (permissions: Permission) => void;
  };
}

export const useAuthStore = create(
  persist<AuthStoreState>(
    (set, get) => ({
      accessToken: null,
      selectedShop: {
        storeId: null,
        storeName: null,
        mainImage: null,
        introduction: null,
      },
      permissions: null,
      actions: {
        getAccessToken: () => get().accessToken,
        getSelectedShop: () => get().selectedShop,
        getPermissions: () => get().permissions,
        setAccessToken: (newAccessToken: string) => {
          set(() => ({ accessToken: newAccessToken }));
        },
        setSelectedShop: (shopInformation: ShopInformation) => {
          set(() => ({ selectedShop: shopInformation }));
        },
        setPermissions: (newPermissions: Permission) => {
          set(() => ({ permissions: newPermissions }));
        },
      },
    }),
    {
      name: STORAGE.auth,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useAccessToken = () => useAuthStore((state) => state.accessToken);

export const useSelectedShop = () =>
  useAuthStore((state) => state.selectedShop);

export const usePermissions = () => useAuthStore((state) => state.permissions);

export const useAuthActions = () => useAuthStore((state) => state.actions);
