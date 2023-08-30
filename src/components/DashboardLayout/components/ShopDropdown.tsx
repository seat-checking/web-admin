import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components/macro';
import type { DropdownShop, Shop } from 'common/utils/types';
import { ReactComponent as ChevronDown } from 'assets/icons/chevron-down.svg';
import { ReactComponent as PlusSquareIcon } from 'assets/icons/plus-square.svg';
import { useGetOwnedShops } from 'common/hooks/queries/useGetOwnedShops';
import { useGetPermission } from 'common/hooks/queries/useGetPermission';
import { PATH } from 'common/utils/constants';
import { ShopDropdownItem } from 'components/DashboardLayout/components/ShopDropdownItem';
import { ellipsisText } from 'styles/mixin';

interface ShopDropdownProps {
  onClose?: () => void;
  isFolded: boolean;
  selectedShop: Shop;
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop>>;
}

/**
 * 가게 드롭다운 컴포넌트
 */
export const ShopDropdown: React.FC<ShopDropdownProps> = ({
  isFolded,
  selectedShop,
  setSelectedShop,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: storeResponseList } = useGetOwnedShops(isOpen);
  const { fetchPermission } = useGetPermission();

  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleAddShop = () => {
    navigate(`/${PATH.addShop}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChangeSelectedShop = async (shop: DropdownShop) => {
    await fetchPermission(shop.storeId);
    setSelectedShop({
      storeId: shop.storeId,
      storeName: shop.storeName,
      mainImage: shop.mainImage,
      introduction: shop.introduction,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Wrap ref={containerRef}>
      <TriggerBtn
        type='button'
        onClick={handleToggleDropdown}
        folded={isFolded}
      >
        <SelecteText folded={isFolded}>{selectedShop.storeName}</SelecteText>
        <ChevronDown stroke='white' />
      </TriggerBtn>
      {isOpen && (
        <DropdownWrap>
          <Header>
            <AddShopBtn onClick={handleAddShop}>
              <PlusSquareIcon stroke={theme.palette.grey[300]} />
              가게 추가
            </AddShopBtn>
          </Header>
          <Body>
            {storeResponseList?.map((shop) => (
              <ShopDropdownItem
                key={shop.storeId}
                shop={shop}
                isSelected={selectedShop.storeId === shop.storeId}
                onClick={() => handleChangeSelectedShop(shop)}
              />
            ))}
          </Body>
        </DropdownWrap>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  margin-top: 0.8rem;

  width: 100%;

  color: ${({ theme }): string => theme.palette.grey[300]};
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  text-align: center;
`;
const TriggerBtn = styled.button<{ folded: boolean }>`
  margin-top: ${({ folded }): string => (folded ? '1.2rem' : '1.4rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SelecteText = styled.div<{ folded: boolean }>`
  margin-right: 0.8rem;

  font-weight: 600;
  font-size: ${({ folded }): string => (folded ? '1.4rem' : '2.4rem')};
  color: white;

  max-width: ${({ folded }): string => (folded ? '7.6rem' : '18rem')};
  ${ellipsisText(1)}
`;

const DropdownWrap = styled.div`
  position: absolute;
  top: 5rem;
  left: 4rem;

  width: 34.8rem;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border: 0.2rem solid ${({ theme }) => theme.palette.grey[400]};
  box-shadow: 0px 1.8rem 6.8rem 0px rgba(0, 0, 0, 0.25);

  border-radius: 1.2rem;
`;

const Header = styled.div`
  padding: 1.6rem;
`;

const AddShopBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  font-size: 1.2rem;
  font-weight: 500;
`;

const Body = styled.div``;