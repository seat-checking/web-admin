import styled, { css } from 'styled-components/macro';
import type { DropdownShop } from 'common/utils/types';
import defaultShopImg from 'assets/images/default-shop.png';
import { HelperText } from 'components/DashboardLayout/components/HelperText';
import { Tooltip } from 'components/DashboardLayout/components/Tooltip';
import { Toggle } from 'components/Toggle';

/* eslint-disable react/destructuring-assignment */
interface DropdownItemProps {
  isSelected: boolean;
  onClick: VoidFunction;
  shop: DropdownShop;
}

/**
 * 컴포넌트
 */
export const DropdownItem: React.FC<DropdownItemProps> = ({
  shop,
  isSelected,
  onClick,
}) => {
  return (
    <Wrap type='button' $isSelected={isSelected} onClick={onClick}>
      <Img src={shop.mainImage || defaultShopImg} alt='' />
      <MiddleWrap>
        <UpperWrap>
          <StoreName>{shop.storeName}</StoreName>
          <Circle $isClosed={shop.isClosedTody} />
          <ClosedToday>
            {shop.isClosedTody ? '영업 중' : '영업 종료'}
          </ClosedToday>
        </UpperWrap>
        <Introduction>{shop.introduction}</Introduction>
      </MiddleWrap>
      <RightWrap>
        <Toggle isChecked={shop.isOpenNow} />
        <HelperText>
          일시 정지
          <Tooltip />
        </HelperText>
      </RightWrap>
    </Wrap>
  );
};

const Wrap = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;

  padding: 2rem 1.6rem;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: rgba(255, 255, 255, 0.1);
    `};
`;

const Img = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  object-fit: cover;

  margin-right: 0.8rem;
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
`;

const ClosedToday = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
`;

const Circle = styled.div<{ $isClosed: boolean }>`
  margin-left: 0.6rem;
  margin-right: 0.4rem;

  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${({ $isClosed, theme }) =>
    $isClosed ? theme.palette.primary.orange : theme.palette.grey[300]};
`;

const Introduction = styled.div`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: normal;

  text-align: start;
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 0.4rem;
`;
