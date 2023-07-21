import styled from 'styled-components/macro';
import { TABLE_SIZE_PX } from 'pages/LayoutSettingPage/utils/constants';

interface TableProps {
  //   sort: 'table' | 'chair';
  width?: number;
  height?: number;
}

/**
 * 테이블 컴포넌트 (좌석 배치 탭)
 */
export const Table: React.FC<TableProps> = ({ width = 1, height = 1 }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('sort', 'table');
    event.dataTransfer.setData('width', String(width));
    event.dataTransfer.setData('height', String(height));

    // 이거 안넣어주면 firefox에서 에러남
    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
    event.dataTransfer.setData('text/plain', '');
  };
  return (
    <Wrap
      data-sort='table'
      width={width}
      height={height}
      draggable
      onDragStart={handleDragStart}
    />
  );
};

const Wrap = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => TABLE_SIZE_PX * width + 'px'};
  height: ${({ height }) => TABLE_SIZE_PX * height + 'px'};
  border: 1px solid ${({ theme }) => theme.palette.black.main};
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;
