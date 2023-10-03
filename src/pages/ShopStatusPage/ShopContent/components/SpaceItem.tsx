import {
  Name,
  SpaceBox,
} from 'pages/LayoutSettingPage/components/Space.styled';

interface SpaceItemProps {
  name: string;
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * 컴포넌트
 */
export const SpaceItem: React.FC<SpaceItemProps> = ({
  name,
  onSelect,
  isSelected,
}) => {
  return (
    <SpaceBox onClick={onSelect} isSelected={isSelected}>
      <Name>{name}</Name>
    </SpaceBox>
  );
};
