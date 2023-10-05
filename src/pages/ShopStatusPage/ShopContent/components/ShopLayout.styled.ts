import styled, { css } from 'styled-components/macro';
import {
  CHAIR_SIZE_PX,
  COLUMN_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';
import { flexSet } from 'styles/mixin';

export const GridWrap = styled.div<{ $height?: number }>`
  position: relative;

  width: ${TABLE_SIZE_PX * COLUMN_CNT}px;
  height: ${({ $height }) =>
    $height ? $height * TABLE_SIZE_PX + 'px' : '500px'};

  background-color: white;

  box-sizing: content-box;

  border-bottom: 2px solid ${({ theme }) => theme.palette.grey[200]};
  border-left: 2px solid ${({ theme }) => theme.palette.grey[200]};
  border-right: 2px solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 0 0 12px 12px;

  transition: all 0.2s ease;
`;

export const GridTable = styled.div<{
  width: number;
  height: number;
  x: number;
  y: number;
}>`
  position: absolute;
  background-color: ${(props): string => props.theme.palette.grey[100]};

  border-color: ${({ theme }) => theme.palette.black.main};
  border-width: 0.1rem;
  border-style: solid;

  width: ${({ width }) => width * TABLE_SIZE_PX + 'px'};
  height: ${({ height }) => height * TABLE_SIZE_PX + 'px'};
  transform: translate(
    ${({ x, y }) => `${x * TABLE_SIZE_PX}px, ${y * TABLE_SIZE_PX}px`}
  );
`;

// 의자 바깥에 투명한 테두리를 넣기 위함
export const ChairBorder = styled.div<{
  x: number;
  y: number;
}>`
  width: ${TABLE_SIZE_PX}px;
  height: ${TABLE_SIZE_PX}px;

  position: absolute;
  transform: translate(
    ${({ x, y }) => `${x * TABLE_SIZE_PX}px, ${y * TABLE_SIZE_PX}px`}
  );
  ${flexSet()};
`;

// 검정 테두리를 준 의자 영역
export const Chair = styled.div<{
  isClickable?: boolean;
  isSelected?: boolean;
  isUsing?: boolean;
}>`
  ${flexSet()};
  background-color: ${(props): string => props.theme.palette.grey[100]};

  width: ${CHAIR_SIZE_PX}px;
  height: ${CHAIR_SIZE_PX}px;

  border: 1px solid ${({ theme }) => theme.palette.black.main};

  border-radius: 50%;
  transition: all 0.1s ease;
  cursor: pointer;

  font-size: 0.9rem;
  font-weight: 400;
  user-select: none; // 텍스트 선택 막음

  color: ${({ theme }) => theme.palette.grey[400]};

  ${({ isUsing }) =>
    isUsing &&
    css`
      background-color: ${({ theme }) => theme.palette.primary.orange};
      color: white;
    `}

  ${({ isClickable }) =>
    isClickable &&
    css`
      border: 0.1rem solid rgba(147, 63, 255, 0.5); // clickable
    `};
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 0.1rem solid #933fff; // clicked
      box-shadow: 0px 0px 0.3rem 0.15rem rgba(147, 63, 255, 0.5); //clicked
    `};
`;

export const EmptyText = styled.span`
  font-size: 2.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.grey[500]};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;
