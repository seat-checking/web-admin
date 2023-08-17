import { useState } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { ReactComponent as PlusSquareIcon } from 'assets/icons/plus-square.svg';
import { STORAGE } from 'common/utils/constants';
import { DropdownItem } from 'components/DashboardLayout/components/DropdownItem';

interface ShopDropdownProps {
  onClose: () => void;
}

const storeResponseList = [
  {
    storeId: 48,
    storeName: 'pc방',
    introduction: '강남 1호점', // 추가
    openNow: true,
    closedToday: false,
    mainImage: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E', // 추가
  },
  {
    storeId: 47,
    storeName: 'pc방',
    introduction: '강남 2호점', // 추가
    openNow: false,
    closedToday: true,
    mainImage: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E', // 추가
  },
  {
    storeId: 46,
    storeName: '수민 카페',
    introduction: '사당점', // 추가
    openNow: false,
    closedToday: true,
    mainImage: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E', // 추가
  },
];
/**
 * 컴포넌트
 */
export const ShopDropdown: React.FC<ShopDropdownProps> = ({ onClose }) => {
  const theme = useTheme();
  const [currentStoreId, setCurrentStoreId] = useState(
    Number(localStorage.getItem(STORAGE.storeId)),
  );

  const handleChangeStoreId = (storeId: number) => {
    localStorage.setItem(STORAGE.storeId, storeId.toString());
    setCurrentStoreId(storeId);
  };

  return (
    <Wrap onClick={onClose}>
      <Header>
        <PlusSquareIcon stroke={theme.palette.grey[300]} />
        가게 추가
      </Header>
      <Body>
        {storeResponseList.map((store) => (
          <DropdownItem
            props={store}
            isSelected={currentStoreId === store.storeId}
            onClick={() => handleChangeStoreId(store.storeId)}
          />
        ))}
      </Body>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: absolute;
  left: 4rem;

  width: 34.8rem;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  border: 0.2rem solid ${({ theme }) => theme.palette.grey[400]};
  box-shadow: 0px 18.333332061767578px 68.33332824707031px 0px
    rgba(0, 0, 0, 0.25);

  border-radius: 1.2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  padding: 1.6rem;

  font-size: 1.2rem;
  font-weight: 500;
`;

const Body = styled.div``;
