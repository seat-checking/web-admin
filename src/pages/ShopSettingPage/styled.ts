import styled from 'styled-components/macro';

export const Wrap = styled.div`
  flex: 1; // side bar 제외 남은 영역 꽉 채우기
  /* min-height: 100vh; */
  overflow: auto; // 필요
  display: flex;
`;

export const ContentWrap = styled.div`
  padding-top: 8.9rem;
  flex: 1;
`;

export const HeaderWrap = styled.div`
  position: relative; // 버튼 배치 위함

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
