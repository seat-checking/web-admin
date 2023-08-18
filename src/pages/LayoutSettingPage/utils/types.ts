import type { Layout } from 'react-grid-layout';

export interface SpaceType {
  storeSpaceId: number;
  storeSpaceName: string;
}

export type ShopFormState = 'SQUARE' | 'RECTANGLE' | 'NONE';

export type ItemType = 'chair' | 'table';

export interface CustomLayout extends Layout {
  sort: ItemType;
  manageId?: number;
}
