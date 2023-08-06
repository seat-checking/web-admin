import { useTheme } from 'styled-components';
import { ReactComponent as ChevronRightThinIcon } from 'assets/icons/chevron-right-thin.svg';
import { PATH } from 'common/utils/constants';
import {
  Circle,
  LeftWrap,
  Name,
  OpenStatus,
  Text,
  Wrap,
} from 'pages/ShopSettingPage/components/SettingSideBar/ShopItem.styled';

interface ShopItemProps {
  id: number;
  name: string;
  isOperating: boolean;
}

/**
 * 가게 아이템 컴포넌트
 */
export const ShopItem: React.FC<ShopItemProps> = ({
  id,
  name,
  isOperating,
}) => {
  const theme = useTheme();
  return (
    <Wrap to={`/${PATH.setting}/${id}`}>
      <LeftWrap>
        <Name>{name}</Name>
        <OpenStatus>
          <Circle isOperating={isOperating} />
          <Text>{isOperating ? `영업 중` : `영업 준비 중`}</Text>
        </OpenStatus>
      </LeftWrap>
      <ChevronRightThinIcon stroke={theme.palette.grey[300]} />
    </Wrap>
  );
};
