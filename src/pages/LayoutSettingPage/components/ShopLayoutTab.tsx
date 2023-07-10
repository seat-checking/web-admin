import {
  DescriptionText,
  Label,
  LayoutBox,
  Rectangle,
  Square,
  WidthSettingBox,
  Wrap,
} from './LayoutTab.styled';
import { Button } from 'components/Button';

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
          <input type='radio' id='square' name='layout' value='square' />
        </Label>
        <Label htmlFor='rectangle'>
          <Rectangle />
          <input type='radio' id='rectangle' name='layout' value='rectangle' />
        </Label>
      </LayoutBox>
      <WidthSettingBox>가게 세로 길이</WidthSettingBox>
      <Button>다음</Button>
    </Wrap>
  );
};
