import type { HTMLAttributes } from 'react';
import {
  ListItem,
  Text,
} from 'components/Tabs.tsx/components/TabNavItem.styled';

interface TabNavItemProps extends HTMLAttributes<HTMLLIElement> {
  text: string;
  index: number;
  activeTab: number;
  isClickable: boolean;
}

/**
 * Tab 전환 아이템 컴포넌트
 */
export const TabNavItem: React.FC<TabNavItemProps> = ({
  text,
  index,
  activeTab,
  isClickable,
  ...rest
}) => {
  return (
    <ListItem {...rest} $isClickable={isClickable}>
      <Text active={activeTab === index}>{text}</Text>
    </ListItem>
  );
};
