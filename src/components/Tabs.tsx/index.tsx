import styled from 'styled-components/macro';
import type React from 'react';
import { TabNavItem } from 'components/Tabs.tsx/components/TabNavItem';

export interface TabItem {
  label: string;
  content: React.ReactElement;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabList: TabItem[];
  tabWidth?: string;
  activeTab: number;
  onClickTab?: (index: number) => void;
}

/**
 * 탭 메뉴 컴포넌트
 */
export const Tabs: React.FC<TabsProps> = ({
  tabList,
  tabWidth,
  activeTab,
  onClickTab,
  ...rest
}) => {
  const tabNavItemList = tabList.map(
    (item, index): React.ReactElement => (
      <TabNavItem
        key={item.label}
        index={index}
        text={item.label}
        activeTab={activeTab}
        isClickable={!!onClickTab}
        {...(onClickTab && { onClick: () => onClickTab(index) })}
      />
    ),
  );

  return (
    <Wrap {...rest}>
      <TabWrap>{tabNavItemList}</TabWrap>
      {tabList.map((item, index) => (
        <ContentWrap hidden={activeTab !== index} key={item.label}>
          {item.content}
        </ContentWrap>
      ))}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TabWrap = styled.ul`
  display: flex;
  height: 6rem;

  box-shadow: inset 0px -0.3rem 0px #e6e6e6;
`;

const ContentWrap = styled.div`
  flex: 1;
`;
