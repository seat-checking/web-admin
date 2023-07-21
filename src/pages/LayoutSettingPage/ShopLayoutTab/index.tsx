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
} from 'pages/LayoutSettingPage/ShopLayoutTab/ShopLayoutTab.styled';
import { CheckRadioButton } from 'pages/LayoutSettingPage/ShopLayoutTab/components/CheckRadioButton';

/**
 * '좌석 설정' > '가게 형태' 탭 클릭했을 때 보여줄 컴포넌트
 */
export const ShopLayoutTab: React.FC = () => {
  return (
    <Wrap>
      <DescriptionText>
        우리 가게와 가장 비슷한 형태를 선택해주세요.
      </DescriptionText>
      <LayoutBox>
        <Label htmlFor='square'>
          <Square />
          <CheckRadioButton id='square' name='layout' value='square' />
        </Label>
        <Label htmlFor='rectangle'>
          <RectangleWrap>
            <Rectangle />
          </RectangleWrap>
          <CheckRadioButton id='rectangle' name='layout' value='rectangle' />
        </Label>
      </LayoutBox>
      <WidthSettingBox>
        <SettingLabel>가게 세로 길이</SettingLabel>
        <IconWrap>
          <ChevronLeftCircle />
        </IconWrap>
        <HeightInput />
        <IconWrap>
          <CheveronRightCircle />
        </IconWrap>
      </WidthSettingBox>
      <StyledButton>다음</StyledButton>
    </Wrap>
  );
};
