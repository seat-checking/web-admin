import { ResizableBox } from 'react-resizable';
import styled from 'styled-components/macro';
import chevronDown from 'assets/icons/chevron-down.svg';
import { SideBar } from 'components/SideBar';

export const Wrap = styled.div`
  flex: 1; // GNB 제외한 영역 꽉 채우기
  display: flex;
  background-color: ${({ theme }) => theme.palette.grey[100]};

  // 그리드 아이템의 resizable 영역 좁힘
  .react-grid-item > .react-resizable-handle {
    width: 1rem;
    height: 1rem;
  }

  // 가게 형태 resizable 마우스 커스텀
  .react-resizable > .react-resizable-handle.react-resizable-handle-s {
    transform: rotate(0);
    bottom: -5px;
    width: 100%;
    left: 0;
    margin-left: 0;
    background-image: none;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      width: 3rem;
      height: 3rem;
      background-color: ${({ theme }) => theme.palette.grey[300]};
      mask-image: url(${chevronDown});
      mask-position: center;
      mask-size: contain;
    }
  }
`;

export const StyledSideBar = styled(SideBar)`
  padding-top: 6rem;
  padding-bottom: 8rem;
`;

export const RightWrap = styled.div`
  padding: 3rem 1.5rem;

  margin: auto;
  flex-direction: column;
`;

export const ResizableWrap = styled(ResizableBox)<{
  $width?: number;
}>`
  background-color: white;

  width: ${({ $width }) => $width && $width + 'px'};

  box-sizing: content-box;
  padding-top: 4px;
  padding-bottom: 4px;

  border-bottom: 2px solid ${({ theme }) => theme.palette.grey[200]};
  border-left: 2px solid ${({ theme }) => theme.palette.grey[200]};
  border-right: 2px solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 0 0 12px 12px;
`;

export const GridWrap = styled.div`
  background-color: skyblue;
`;
