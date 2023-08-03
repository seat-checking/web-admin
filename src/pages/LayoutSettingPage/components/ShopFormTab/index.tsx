import { useEffect, useState } from 'react';
import type { ChangeRowCommand } from 'pages/LayoutSettingPage/hooks/useShopHeight';
import type { ShopFormState } from 'pages/LayoutSettingPage/utils/types';
import { ReactComponent as ChevronLeftCircle } from 'assets/icons/chevron-left-circle.svg';
import { ReactComponent as CheveronRightCircle } from 'assets/icons/chevron-right-circle.svg';
import {
  DescriptionText,
  HeightInput,
  IconWrap,
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
  rowCnt: number;
  minRowCnt: number;
  changeRowCnt: (value: number | ChangeRowCommand) => void;
  changeTab: (index: number) => void;
  shopFormState: ShopFormState;
  setShopFormState: React.Dispatch<React.SetStateAction<ShopFormState>>;
}
/**
 * '좌석 설정' > '가게 형태' 탭 클릭했을 때 보여줄 컴포넌트
 */
export const ShopFormTab: React.FC<ShopFormTabProps> = ({
  rowCnt,
  minRowCnt,
  changeRowCnt,
  changeTab,
  shopFormState: checkState,
  setShopFormState: setCheckState,
}) => {
  const [heightInput, setHeightInput] = useState(rowCnt * TABLE_SIZE_PX);

  const handleResizeUpDown = (command: ChangeRowCommand) => {
    if (command === 'DOWN' && rowCnt <= 2) {
      return;
    }
    setCheckState('NONE');
    changeRowCnt(command);
  };

  const handleResizeByChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.currentTarget.value;
    if (size === 'SQUARE') {
      changeRowCnt(COLUMN_CNT);
      setCheckState(size);
      return;
    }
    if (size === 'RECTANGLE') {
      changeRowCnt(DEFAULT_ROW_CNT);
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
      changeRowCnt(minRowCnt);
      return;
    }

    const nearestHeight = nearestDivisible(heightInput);
    setHeightInput(nearestHeight);
    changeRowCnt(nearestHeight / TABLE_SIZE_PX);
  };

  const handleChangeNextTab = () => {
    changeTab(1);
  };

  useEffect(() => {
    setHeightInput(rowCnt * TABLE_SIZE_PX);
  }, [rowCnt]);

  return (
    <Wrap>
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
        <IconWrap onClick={() => handleResizeUpDown('DOWN')}>
          <ChevronLeftCircle />
        </IconWrap>
        <HeightInput
          value={heightInput}
          onChange={handleChangeInput}
          onBlur={handleRoundInput}
        />

        <IconWrap onClick={() => handleResizeUpDown('UP')}>
          <CheveronRightCircle />
        </IconWrap>
      </WidthSettingBox>
      <StyledButton onClick={handleChangeNextTab}>다음</StyledButton>
    </Wrap>
  );
};
