import { useEffect, useState } from 'react';
import type { ChangeRowCommand } from 'pages/LayoutSettingPage/hooks/useShopHeight';
import type { ShopFormState } from 'pages/LayoutSettingPage/utils/types';

import { CircledArrowButton } from 'components/CircledArrowButton';
import {
  DescriptionText,
  HeightInput,
  Label,
  LayoutBox,
  Rectangle,
  RectangleWrap,
  SettingLabel,
  Square,
  StyledButton,
  WidthSettingBox,
  Wrap,
} from 'pages/LayoutSettingPage/components/ShopFormTab/ShopFormTab.styled';
import { CheckRadioButton } from 'pages/LayoutSettingPage/components/ShopFormTab/components/CheckRadioButton';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';
import {
  useShopHeight,
  useShopHeightActions,
} from 'pages/LayoutSettingPage/stores/shopHeightStore';
import {
  COLUMN_CNT,
  DEFAULT_ROW_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

function nearestDivisible(n: number): number {
  const divisor = TABLE_SIZE_PX;
  const remainder = n % divisor;

  if (remainder < divisor / 2) {
    return n - remainder;
  }
  return n + (divisor - remainder);
}

interface ShopFormTabProps {
  minRowCnt: number;
  changeTab: (index: number) => void;
  shopFormState: ShopFormState;
  setShopFormState: React.Dispatch<React.SetStateAction<ShopFormState>>;
  isDisabled: boolean;
}
/**
 * '좌석 설정' > '가게 형태' 탭 클릭했을 때 보여줄 컴포넌트
 */
export const ShopFormTab: React.FC<ShopFormTabProps> = ({
  minRowCnt,
  changeTab,
  shopFormState: checkState,
  setShopFormState: setCheckState,
  isDisabled,
}) => {
  const shopHeight = useShopHeight();
  const { changeHeight } = useShopHeightActions();

  const [heightInput, setHeightInput] = useState(shopHeight * TABLE_SIZE_PX);
  const { setChange } = useChange();

  const handleResizeUpDown = (command: ChangeRowCommand) => {
    if (command === 'DOWN' && shopHeight <= 2) {
      return;
    }
    setCheckState('NONE');
    changeHeight(command, minRowCnt);
    setChange(true);
  };

  const handleResizeByChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(true);

    const size = e.currentTarget.value;
    if (size === 'SQUARE') {
      changeHeight(COLUMN_CNT, minRowCnt);
      setCheckState(size);
      return;
    }
    if (size === 'RECTANGLE') {
      changeHeight(DEFAULT_ROW_CNT, minRowCnt);
      setCheckState(size);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeightInput(Number(e.currentTarget.value));
    setCheckState('NONE');
  };

  const handleRoundInput = () => {
    // TODO: 리팩토링
    const minHeight = minRowCnt * TABLE_SIZE_PX;
    if (heightInput < minHeight) {
      setHeightInput(minHeight);
      changeHeight(minRowCnt, minRowCnt);
      return;
    }

    const nearestHeight = nearestDivisible(heightInput);
    setHeightInput(nearestHeight);
    changeHeight(nearestHeight / TABLE_SIZE_PX, minRowCnt);
  };

  const handleChangeNextTab = () => {
    changeTab(1);
  };

  useEffect(() => {
    setHeightInput(shopHeight * TABLE_SIZE_PX);
  }, [shopHeight]);

  return (
    <Wrap $isDisabled={isDisabled}>
      <DescriptionText>
        우리 가게와 가장 비슷한 형태를 선택해주세요.
      </DescriptionText>
      <LayoutBox>
        <Label>
          <Square $isChecked={checkState === 'SQUARE'} />
          <CheckRadioButton
            name='layout'
            value='SQUARE'
            checked={checkState === 'SQUARE'}
            onChange={handleResizeByChecked}
          />
        </Label>
        <Label>
          <RectangleWrap>
            <Rectangle $isChecked={checkState === 'RECTANGLE'} />
          </RectangleWrap>
          <CheckRadioButton
            name='layout'
            value='RECTANGLE'
            checked={checkState === 'RECTANGLE'}
            onChange={handleResizeByChecked}
          />
        </Label>
      </LayoutBox>
      <WidthSettingBox>
        <SettingLabel>가게 세로 길이</SettingLabel>
        <CircledArrowButton
          direction='LEFT'
          onClick={() => handleResizeUpDown('DOWN')}
        />
        <HeightInput
          value={heightInput}
          onChange={handleChangeInput}
          onBlur={handleRoundInput}
        />
        <CircledArrowButton
          direction='RIGHT'
          onClick={() => handleResizeUpDown('UP')}
        />
      </WidthSettingBox>
      <StyledButton onClick={handleChangeNextTab} isDisabled={isDisabled}>
        다음
      </StyledButton>
    </Wrap>
  );
};
