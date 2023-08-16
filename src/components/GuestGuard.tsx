import { Navigate } from 'react-router-dom';
import { isAuthenticated } from 'common/utils/auth';

interface GuestGuardProps {
  children: JSX.Element;
}

/**
 * 로그인이 되지 않은 상태를 체크하기 위한 컴포넌트
 */
export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to='/' />;
  }

  return children;
};
