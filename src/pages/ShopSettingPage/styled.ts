import styled from 'styled-components/macro';

export const Wrap = styled.div`
  flex: 1; // side bar 제외 남은 영역 꽉 채우기
  /* min-height: 100vh; */
  overflow: auto; // 필요
  display: flex;
`;
export const HeaderWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ContentWrap = styled.div`
  padding-top: 8.9rem;
  padding-right: 9.6rem;
  flex: 1;
`;
