import styled, { css } from 'styled-components/macro';
import type { DropdownShop } from 'common/utils/types';
import seatSenseLogo from 'assets/images/seatsense-bg-1x.png';
import { HelperText } from 'components/DashboardLayout/components/HelperText';

import { Toggle } from 'components/Toggle';
import { ellipsisText } from 'styles/mixin';

interface DropdownItemProps {
  isSelected: boolean;
  onClick: VoidFunction;
  shop: DropdownShop;
  pageIdx: number;
  itemIdx: number;
  refetch: () => void;
}

/**
 * 가게 리스트 드롭다운 아이템
 */
export const ShopDropdownItem: React.FC<DropdownItemProps> = ({
  shop,
  isSelected,
  onClick,
  pageIdx,
  itemIdx,
  refetch,
}) => {
  return (
    <Wrap type='button' $isSelected={isSelected} onClick={onClick}>
      <Img src={shop.mainImage || seatSenseLogo} alt='가게 로고' />
      <MiddleWrap>
        <UpperWrap>
          <StoreName>{shop.storeName}</StoreName>
          <Circle $isOpen={shop.isOpenNow} />
          <IsOpenText $isOpen={shop.isOpenNow}>
            {shop.isOpenNow ? '영업 중' : '준비 중'}
          </IsOpenText>
        </UpperWrap>
      </MiddleWrap>
      <RightWrap>
        <Toggle
          isDefaultChecked={!shop.isClosedToday}
          shopId={shop.storeId}
          pageIdx={pageIdx}
          itemIdx={itemIdx}
          refetch={refetch}
        />
        <HelperText>일시 정지</HelperText>
      </RightWrap>
    </Wrap>
  );
};

const Wrap = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 2rem 1.6rem;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: rgba(255, 255, 255, 0.1);
    `};
  ${({ $isSelected }) =>
    !$isSelected &&
    css`
      &:hover {
        background-color: rgba(255, 255, 255, 0.03);
      }
    `};
`;

const Img = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  object-fit: cover;

  margin-right: 0.8rem;

  background-color: white;
`;

const MiddleWrap = styled.div`
  flex: 1;
  /* height: 100%; */
`;

const UpperWrap = styled.div`
  display: flex;
  align-items: center;
`;

const StoreName = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  color: white;

  max-width: 13.5rem;
  ${ellipsisText(1)}
  text-align: start;
`;

const IsOpenText = styled.span<{ $isOpen: boolean }>`
  font-size: 1.2rem;
  font-weight: 400;

  color: ${({ $isOpen: $isClosed, theme }) =>
    $isClosed ? theme.palette.primary.orange : theme.palette.grey[200]};
`;

const Circle = styled.div<{ $isOpen: boolean }>`
  margin-left: 0.6rem;
  margin-right: 0.4rem;

  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${({ $isOpen: $isClosed, theme }) =>
    $isClosed ? theme.palette.primary.orange : theme.palette.grey[200]};
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 0.4rem;
`;
