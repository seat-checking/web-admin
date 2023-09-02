import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';

export const findMinHeight = (layout: CustomItemLayout[]) => {
  let max = 0;
  layout.forEach((item) => {
    if (item.y + item.h <= max) {
      return;
    }
    max = item.y + item.h;
  });
  return max;
};

export const getValidHeight = (newHeight: number, minHeight: number) =>
  newHeight < minHeight ? minHeight : newHeight;
