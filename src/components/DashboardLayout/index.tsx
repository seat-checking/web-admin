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

  /* background-color: yellow; */
`;
