import styled from 'styled-components/macro';
import {
  COLUMN_CNT,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

export const InfoWrap = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 0.8rem;

  font-size: 1.6rem;
  font-weight: 400;
  background-color: ${({ theme }) => theme.palette.black};
`;

export const BoldText = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0.8rem 0 0.4rem;
`;

export const SpaceWrap = styled.div`
  display: flex;

  /* padding: 2rem 0rem 0 2rem; */
  width: ${TABLE_SIZE_PX * COLUMN_CNT + 'px'};
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 1.2rem 1.2rem 0 0;

  // TODO 바깥 테두리 (순권)
  /* outline-style: solid;
  outline-color: ${({ theme }) => theme.palette.grey[200]};
  outline-width: 0.3rem 0.3rem 0 0.3rem; */

  // 내부 테두리
  border-color: ${({ theme }) => theme.palette.primary.dark};
  border-style: solid;
  border-width: 2rem 0rem 0.6rem 2rem;

  padding-bottom: 0.6rem;

  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: 0.5px solid var(--grey-300, #a9abb6);
    background: rgba(255, 255, 255, 0.1);
  }

  &::after {
    content: '';
    position: sticky;
    right: 0;
    width: 4.4rem;
    height: 9.1rem;
    opacity: 0.5;
    background: linear-gradient(270deg, #303030 0%, rgba(48, 48, 48, 0) 100%);
    pointer-events: none; // 클릭 무시
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
