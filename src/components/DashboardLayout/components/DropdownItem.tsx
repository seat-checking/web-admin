import styled, { css } from 'styled-components/macro';
import { HelperText } from 'components/DashboardLayout/components/HelperText';
import { Tooltip } from 'components/DashboardLayout/components/Tooltip';
import { Toggle } from 'components/Toggle';

/* eslint-disable react/destructuring-assignment */
interface DropdownItemProps {
  //   isOpen: boolean;
  //   text: string | number;
  //   func: () => void;
  props: any;
  isSelected: boolean;
  onClick: VoidFunction;
}

/**
 * 컴포넌트
 */
export const DropdownItem: React.FC<DropdownItemProps> = ({
  props,
  isSelected,
  onClick,
}) => {
  return (
    <Wrap type='button' $isSelected={isSelected} onClick={onClick}>
      <Img src={props.mainImage} alt='' />
      <MiddleWrap>
        <UpperWrap>
          <StoreName>{props.storeName}</StoreName>
          <Circle $isClosed={props.closedToday} />
          <ClosedToday>
            {props.closedToday ? '영업 중' : '영업 종료'}
          </ClosedToday>
        </UpperWrap>
        <Introduction>{props.introduction}</Introduction>
      </MiddleWrap>
      <RightWrap>
        <Toggle isChecked={props.openNow} />
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
