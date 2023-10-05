import { useLocation } from 'react-router-dom';

import { usePermissions } from 'common/stores/authStore';
import { PATH } from 'common/utils/constants';

interface AuthGuardProps {
  children: JSX.Element;
}

/**
 * 탭 별 권한을 체크하기 위한 컴포넌트
 */
export const TabGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const path = useLocation().pathname;
  const permissions = usePermissions();

  if (path.includes(PATH.layout) && !permissions?.seatSetting) {
    return null;
  }
  if (path.includes(PATH.setting) && !permissions?.storeSetting) {
    return null;
  }
  if (path.includes(PATH.statistics) && !permissions?.storeStatistics) {
    return null;
  }
  if (path.includes(PATH.shopStatus) && !permissions?.storeStatus) {
    return null;
  }

  return children;
};
