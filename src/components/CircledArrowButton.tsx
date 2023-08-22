import styled from 'styled-components';
import { ReactComponent as ChevronLeftCircle } from 'assets/icons/chevron-left-circle.svg';
import { ReactComponent as CheveronRightCircle } from 'assets/icons/chevron-right-circle.svg';

interface CircledArrowButtonProps {
  direction?: 'LEFT' | 'RIGHT';
  onClick?: () => void;
}

/**
 * 동그란 화살표 버튼 컴포넌트 (좌석 설정, 가게 설정에 사용)
 */
export const CircledArrowButton: React.FC<CircledArrowButtonProps> = ({
  direction = 'LEFT',
  onClick,
}) => {
  return (
    <IconWrap onClick={onClick}>
      {direction === 'LEFT' ? <ChevronLeftCircle /> : <CheveronRightCircle />}
    </IconWrap>
  );
};

export const IconWrap = styled.div`
  cursor: pointer;
  &:hover {
    svg {
      rect {
        fill: ${({ theme }) => theme.palette.primary.orange};
      }
      path {
        stroke: white;
      }
    }
  }
`;
