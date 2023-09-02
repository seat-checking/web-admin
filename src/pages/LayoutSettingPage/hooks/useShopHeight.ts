import { useCallback, useState } from 'react';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';

export type ChangeRowCommand = 'UP' | 'DOWN';

export const useShopMinHeight = () => {
  const [minRowCnt, setMinRowCnt] = useState(0);

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
    minRowCnt,
    changeMinRowCnt,
    findMinRowCnt,
  };
};
