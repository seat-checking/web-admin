import { Button } from 'components/Button';
import { DescriptionText } from 'pages/LayoutSettingPage/components/LayoutTab.styled';

/**
 * '좌석 설정' > '좌석 배치' 탭 클릭했을 때 보여줄 컴포넌트
 */
export const SeatLayoutTab: React.FC = () => {
  return (
    <>
      <DescriptionText>
        개인이 앉을 수 있는 좌석을 기준으로 마우스로 오른쪽에 끌어서 넣어주세요.
      </DescriptionText>
      <Button style={{ width: '37.8rem' }} isDisabled>
        저장하기
      </Button>
    </>
  );
};
