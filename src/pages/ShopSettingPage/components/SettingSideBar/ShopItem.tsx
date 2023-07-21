import {
  Circle,
  LeftWrap,
  Name,
  OpenStatus,
  Text,
  Wrap,
} from 'pages/ShopSettingPage/components/SettingSideBar/ShopItem.styled';
import { Toggle } from 'pages/ShopSettingPage/components/SettingSideBar/Toggle';

interface ShopItemProps {
  name?: string | number;
  func?: () => void;
}

/**
 * 가게 아이템 컴포넌트
 */
export const ShopItem: React.FC<ShopItemProps> = ({ name, func }) => {
  return (
    <Wrap>
      <LeftWrap>
        <Name>{name}</Name>
        <OpenStatus>
          <Circle />
          <Text>영업 준비 중</Text>
        </OpenStatus>
      </LeftWrap>
      <Toggle />
    </Wrap>
  );
};
