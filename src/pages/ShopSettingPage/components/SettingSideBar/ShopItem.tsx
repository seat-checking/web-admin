import { useTheme } from 'styled-components';
import { ReactComponent as ChevronRightThinIcon } from 'assets/icons/chevron-right-thin.svg';
import {
  Circle,
  LeftWrap,
  Name,
  OpenStatus,
  Text,
  Wrap,
} from 'pages/ShopSettingPage/components/SettingSideBar/ShopItem.styled';

interface ShopItemProps {
  name?: string | number;
  func?: () => void;
}

/**
 * 가게 아이템 컴포넌트
 */
export const ShopItem: React.FC<ShopItemProps> = ({ name }) => {
  const theme = useTheme();
  return (
    <Wrap>
      <LeftWrap>
        <Name>{name}</Name>
        <OpenStatus>
          <Circle />
          <Text>영업 준비 중</Text>
        </OpenStatus>
      </LeftWrap>
      <ChevronRightThinIcon stroke={theme.palette.primary.orange} />
    </Wrap>
  );
};
