import type { Layout } from 'react-grid-layout';

export interface SpaceType {
  storeSpaceId: number;
  name: string;
}

export type ShopFormState = 'SQUARE' | 'RECTANGLE' | 'NONE';

export type ItemType = 'chair' | 'table';

export interface CustomItemLayout extends Layout {
  sort: ItemType;
  manageId?: number;
}

export interface ReservationUnit {
  seat: boolean;
  space: boolean;
}
