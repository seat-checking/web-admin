import styled from 'styled-components/macro';
import { CHAIR_SIZE_PX } from 'pages/LayoutSettingPage/utils/constants';

/**
 * 의자 컴포넌트 (좌석 배치 탭)
 */
export const Chair: React.FC = () => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('sort', 'chair');
    event.dataTransfer.setData('width', '1');
    event.dataTransfer.setData('height', '1');

    // 이거 안넣어주면 firefox에서 에러남
    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
    event.dataTransfer.setData('text/plain', '');
  };
  return <Wrap draggable onDragStart={handleDragStart} />;
};

const Wrap = styled.div`
  width: ${`${CHAIR_SIZE_PX}px`};
  height: ${`${CHAIR_SIZE_PX}px`};
  border: 1px solid ${({ theme }) => theme.palette.black.main};
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border-radius: 50%;
`;
