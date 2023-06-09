interface AuthGuardProps {
  children: JSX.Element;
}

/**
 * 로그인이 된 상태를 체크하기 위한 컴포넌트
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // if (localStorage.getItem(STORAGE.jwt) === null) {
  //     return <Navigate to={`/${PATH.login}`} />;
  //   }

  return children;
};
