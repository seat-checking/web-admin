import { useCallback, useState } from 'react';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';

export type ChangeRowCommand = 'UP' | 'DOWN';

interface Return {
  rowCnt: number;
  minRowCnt: number;
  changeRowCnt: (value: number | ChangeRowCommand) => void;
  changeMinRowCnt: (height: number) => void;
  findMinRowCnt: (layouts: CustomItemLayout[]) => number;
}

export const useShopHeight = (defaultRowCnt: number): Return => {
  const [rowCnt, setRowCnt] = useState(defaultRowCnt);
  const [minRowCnt, setMinRowCnt] = useState(0);

  const getValidRowCnt = useCallback(
    (newRowCnt: number) => {
      return newRowCnt < minRowCnt ? minRowCnt : newRowCnt;
    },
    [minRowCnt],
  );

  const changeRowCnt = useCallback(
    (value: number | ChangeRowCommand) => {
      if (value === 'UP') {
        setRowCnt((prev) => getValidRowCnt(prev + 1));
        return;
      }
      if (value === 'DOWN') {
        setRowCnt((prev) => getValidRowCnt(prev - 1));
        return;
      }
      setRowCnt(getValidRowCnt(value));
    },
    [getValidRowCnt],
  );

  const changeMinRowCnt = useCallback((height: number) => {
    setMinRowCnt(height);
  }, []);

  const findMinRowCnt = useCallback((layouts: CustomItemLayout[]) => {
    let max = 0;
    layouts.forEach((layout) => {
      if (layout.y + layout.h <= max) {
        return;
      }
      max = layout.y + layout.h;
    });
    return max;
  }, []);

  return {
    rowCnt,
    minRowCnt,
    changeRowCnt,
    changeMinRowCnt,
    findMinRowCnt,
  };
};
