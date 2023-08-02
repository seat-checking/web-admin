import { useState } from 'react';
import type { MyLayout } from 'pages/LayoutSettingPage';

export type ChangeRowCommand = 'UP' | 'DOWN';

interface Return {
  rowCnt: number;
  minRowCnt: number;
  changeRowCnt: (value: number | ChangeRowCommand) => void;
  changeMinRowCnt: (height: number) => void;
  findMinRowCnt: (layouts: MyLayout[]) => number;
}

export const useShopHeight = (defaultRowCnt: number): Return => {
  const [rowCnt, setRowCnt] = useState(defaultRowCnt);
  const [minRowCnt, setMinRowCnt] = useState(0);

  const getValidRowCnt = (newRowCnt: number) =>
    newRowCnt < minRowCnt ? minRowCnt : newRowCnt;

  const changeRowCnt = (value: number | ChangeRowCommand) => {
    if (value === 'UP') {
      setRowCnt((prev) => getValidRowCnt(prev + 1));
      return;
    }
    if (value === 'DOWN') {
      setRowCnt((prev) => getValidRowCnt(prev - 1));
      return;
    }
    setRowCnt(getValidRowCnt(value));
  };

  const changeMinRowCnt = (height: number) => {
    setMinRowCnt(height);
  };

  const findMinRowCnt = (layouts: MyLayout[]) => {
    let max = 0;
    layouts.forEach((layout) => {
      if (layout.y + layout.h <= max) {
        return;
      }
      max = layout.y + layout.h;
    });
    return max;
  };

  return {
    rowCnt,
    minRowCnt,
    changeRowCnt,
    changeMinRowCnt,
    findMinRowCnt,
  };
};
