import GridLayout from 'react-grid-layout';
import styled from 'styled-components/macro';
import { SideBar } from 'components/SideBar';
import {
  CHAIR_BORDER_PX,
  CHAIR_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';
import { flexSet } from 'styles/mixin';

export const Wrap = styled.div`
  flex: 1; // GNB 제외한 영역 꽉 채우기
  display: flex;
  background-color: ${({ theme }) => theme.palette.grey[100]};

  // resizable 영역 범위 바꾸는 부분
  .react-grid-item > .react-resizable-handle {
    width: 1rem;
    height: 1rem;
  }

  .clickable {
    cursor: pointer;
  }
`;

export const StyledSideBar = styled(SideBar)`
  padding-top: 6rem;
  padding-bottom: 8rem;
`;

export const RightWrap = styled.div`
  /* background-color: aqua; */

  margin: auto;
  flex-direction: column;
`;

export const ShopGridBackground = styled(GridLayout)<{
  width: number;
  $height: number;
}>`
  width: ${({ width }) => {
    return width + 'px';
  }};

  height: 500px;

  background-color: white;

  border-bottom: 0.3rem solid ${({ theme }) => theme.palette.grey[200]};
  border-left: 0.3rem solid ${({ theme }) => theme.palette.grey[200]};
  border-right: 0.3rem solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 0 0 1.2rem 1.2rem;
`;

export const GridWrap = styled.div`
  background-color: skyblue;
`;

export const GridTable = styled.div`
  background-color: ${(props): string => props.theme.palette.grey[100]};

  border-color: ${({ theme }) => theme.palette.black.main};
  border-width: 1px;
  border-style: solid;
`;

// 의자 바깥에 투명한 테두리를 넣기 위함
export const ChairBorder = styled.div`
  ${flexSet()}/* background-color: red; */
`;

// 검정 테두리를 준 의자 영역
export const Chair = styled.div`
  background-color: ${(props): string => props.theme.palette.grey[100]};

  width: ${CHAIR_SIZE_PX - CHAIR_BORDER_PX}px;
  height: ${CHAIR_SIZE_PX - CHAIR_BORDER_PX}px;

  border: ${CHAIR_BORDER_PX}px solid ${({ theme }) => theme.palette.black.main};
  border-radius: 50%;
`;
