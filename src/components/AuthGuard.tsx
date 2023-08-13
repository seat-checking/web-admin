import { Navigate } from 'react-router-dom';
import { isAuthenticated } from 'common/utils/auth';
import { PATH } from 'common/utils/constants';

interface AuthGuardProps {
  children: JSX.Element;
}

/**
 * 로그인이 된 상태를 체크하기 위한 컴포넌트
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to={`/${PATH.login}`} />;
  }

  return children;
};
