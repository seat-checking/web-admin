import styled from 'styled-components/macro';
import { Button } from 'components/Button';

export const Wrap = styled.div`
  flex: 1; // side bar 제외 남은 영역 꽉 채우기
  overflow: auto; // 필요
  display: flex;
`;

export const ContentWrap = styled.div`
  padding-top: 8.9rem;
  flex: 1;
`;

export const TabsWrap = styled.div`
  position: relative; // 버튼 배치 위함
`;

export const SaveBtn = styled(Button)`
  position: absolute;
  top: calc((6rem - 3.6rem) / 2);
  right: 6rem;
`;
