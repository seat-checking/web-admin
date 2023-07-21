import styled from 'styled-components/macro';
import {
  COLUMN_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

export const Wrap = styled.div`
  display: flex;

  padding: 2rem;
  width: ${TABLE_SIZE_PX * COLUMN_CNT + 'px'};
  height: 13.1rem;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 1.2rem 1.2rem 0 0;

  border-top: 0.3rem solid ${({ theme }) => theme.palette.grey[200]};
  border-left: 0.3rem solid ${({ theme }) => theme.palette.grey[200]};
  border-right: 0.3rem solid ${({ theme }) => theme.palette.grey[200]};

  overflow-x: auto;

  // 스크롤바 숨기기
  /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
  &::-webkit-scrollbar {
    display: none;
  }

  & {
    scrollbar-width: none; /* 파이어폭스 */
  }
`;

export const AddRow = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  margin-left: 2.8rem;
`;

export const AddText = styled.span`
  margin-left: 0.4rem;

  color: ${({ theme }) => theme.palette.grey[50]};

  font-weight: 500;
  font-size: 2.4rem;
`;
