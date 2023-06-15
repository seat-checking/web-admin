import { Wrap } from 'components/SideBar.styled';

interface SideBarProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * GNB 옆에 붙어있는 사이드바 컴포넌트
 */
export const SideBar: React.FC<SideBarProps> = ({ children, ...rest }) => {
  return <Wrap {...rest}>{children}</Wrap>;
};
