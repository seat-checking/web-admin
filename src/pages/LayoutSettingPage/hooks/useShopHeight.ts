import { useState } from 'react';
import type { MyLayout } from 'pages/LayoutSettingPage';

export type ChangeRowCommand = 'UP' | 'DOWN';

interface Return {
  rowCnt: number;
  maxHeight: number;
  changeRowCnt: (value: number | ChangeRowCommand) => void;
  changeMaxHeight: (height: number) => void;
  findMaxHeight: (layouts: MyLayout[]) => number;
}

export const useShopHeight = (defaultRowCnt: number): Return => {
  const [rowCnt, setRowCnt] = useState(defaultRowCnt);
  const [maxHeight, setMaxHeight] = useState(0);

  const changeRowCnt = (value: number | ChangeRowCommand) => {
    if (value === 'UP') {
      setRowCnt((prev) => prev + 1);
      return;
    }
    if (value === 'DOWN') {
      setRowCnt((prev) => prev - 1);
      return;
    }
    setRowCnt(value);
  };

  const changeMaxHeight = (height: number) => {
    setMaxHeight(height);
  };

  const findMaxHeight = (layouts: MyLayout[]) => {
    let max = 0;
    layouts.forEach((layout) => {
      if (layout.y + layout.h <= max) {
        return;
      }
      max = layout.y + layout.h;
    });
    return max;
  };

  return { rowCnt, maxHeight, changeRowCnt, changeMaxHeight, findMaxHeight };
};
