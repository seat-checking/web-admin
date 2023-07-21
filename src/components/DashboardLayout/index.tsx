import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { GlobalNavigationBar } from 'components/DashboardLayout/components/GlobalNavigationBar';

/**
 * 대시보드 페이지 레이아웃 - 사이드 네비게이션 바 넣어주는 역할
 */
export const DashboardLayout: React.FC = () => {
  return (
    <Wrap>
      <GlobalNavigationBar />
      <Outlet />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  height: 100%;

  /* background-color: yellow; */
`;

// Outlet에는 어떤 css도 적용되지 않음. flex:1을 먹이고 싶으면 Outlet이 아닌 Outlet에 들어갈 컴포넌트에 flex:1 을 주어야함
