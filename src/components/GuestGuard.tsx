interface GuestGuardProps {
  children: JSX.Element | any;
}

/**
 * 로그인이 되지 않은 상태를 체크하기 위한 컴포넌트
 */
export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  //   if (localStorage.getItem(STORAGE.jwt)) {
  //     return <Navigate to='/' />;
  //   }
  return children;
};
