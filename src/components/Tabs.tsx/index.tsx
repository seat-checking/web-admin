import styled, { css } from 'styled-components/macro';
import type React from 'react';
import { TabNavItem } from 'components/Tabs.tsx/components/TabNavItem';

export interface TabItem {
  label: string;
  content: React.ReactElement | null;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabList: TabItem[];
  maxTabWidth?: string;
  minTabWidth?: string;
  activeTab: number;
  onClickTab?: (index: number) => void;
}

/**
 * 탭 메뉴 컴포넌트
 */
export const Tabs: React.FC<TabsProps> = ({
  tabList,
  maxTabWidth,
  minTabWidth,
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
      <TabWrap $maxTabWidth={maxTabWidth} $minTabWidth={minTabWidth}>
        {tabNavItemList}
      </TabWrap>
      {tabList.map(
        (item, index) =>
          activeTab === index && (
            <ContentWrap key={item.label}>{item.content}</ContentWrap>
          ),
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TabWrap = styled.ul<{ $maxTabWidth?: string; $minTabWidth?: string }>`
  display: flex;

  height: 6rem;

  ${({ $maxTabWidth, $minTabWidth }) =>
    $maxTabWidth &&
    css`
      max-width: ${$maxTabWidth};
      min-width: ${$minTabWidth};
      width: 100%;
      margin: auto;
    `}
`;

const ContentWrap = styled.div`
  position: relative;

  ::before {
    content: '';
    position: absolute;
    top: -0.3rem;
    left: 0;
    right: 0;
    border-bottom: 0.35rem solid #e6e6e6;
  }

  flex: 1;
`;
