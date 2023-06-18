import { DescriptionText } from './LayoutTab.styled';
import { Button } from 'components/Button';

/**
 * '좌석 설정' > '가게 형태' 탭 클릭했을 때 보여줄 컴포넌트
 */
export const ShopLayoutTab: React.FC = () => {
  return (
    <>
      <DescriptionText>
        우리 가게와 가장 비슷한 형태를 선택해주세요.
      </DescriptionText>
      <Button>저장하기</Button>
    </>
  );
};
