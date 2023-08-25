import { useLocation } from 'react-router-dom';

import { getPermission } from 'common/utils/auth';
import { PATH } from 'common/utils/constants';

interface AuthGuardProps {
  children: JSX.Element;
}

/**
 * 탭 별 권한을 체크하기 위한 컴포넌트
 */
export const TabGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const path = useLocation().pathname;

  if (path.includes(PATH.layout) && !getPermission('seatSetting')) {
    return null;
  }
  if (path.includes(PATH.setting) && !getPermission('storeSetting')) {
    return null;
  }
  if (path.includes(PATH.shopStatus) && !getPermission('storeStatus')) {
    return null;
  }

  return children;
};
