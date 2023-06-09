import { Outlet } from 'react-router-dom';

/**
 * 컴포넌트
 */
export const DashboardLayout: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'green' }}>
      대시보드레이아웃
      <Outlet />
    </div>
  );
};
