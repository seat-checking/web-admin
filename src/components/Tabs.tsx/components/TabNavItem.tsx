import type { HTMLAttributes } from 'react';
import {
  Button,
  ListItem,
  Text,
} from 'components/Tabs.tsx/components/TabNavItem.styled';

interface TabNavItemProps extends HTMLAttributes<HTMLLIElement> {
  text: string;
  index: number;
  activeTab: number;
}

/**
 * Tab 전환 아이템 컴포넌트
 */
export const TabNavItem: React.FC<TabNavItemProps> = ({
  text,
  index,
  activeTab,
  ...rest
}) => {
  return (
    <ListItem {...rest}>
      <Button type='button'>
        <Text active={activeTab === index}>{text}</Text>
      </Button>
    </ListItem>
  );
};
