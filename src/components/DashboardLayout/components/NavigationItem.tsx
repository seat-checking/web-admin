import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg';
import {
  Li,
  NavigationLink,
} from 'components/DashboardLayout/components/NavigationItem.styled';

interface NavigationItemProps {
  activeIcon: React.FC;
  defaultIcon: React.FC;
  label: string;
  to: string;
  isFolded: boolean;
}

/**
 * 글로벌 네비게이션의 각 아이템 컴포넌트
 */
export const NavigationItem: React.FC<NavigationItemProps> = ({
  activeIcon: ActiveIcon,
  defaultIcon: DefaultIcon,
  label,
  to,
  isFolded,
}) => {
  return (
    <Li>
      <NavigationLink to={to} $folded={isFolded}>
        {({ isActive }) => (
          <>
            {isActive ? <ActiveIcon /> : <DefaultIcon />}
            <div className='hideWrap'>
              <span className='label'>{label}</span>
              <ChevronRight fill={isActive ? '#303030' : 'white'} />
            </div>
          </>
        )}
      </NavigationLink>
    </Li>
  );
};
