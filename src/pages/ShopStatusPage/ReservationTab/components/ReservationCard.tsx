import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import type { InfiniteData } from '@tanstack/react-query';
import type {
  Reservation,
  ProcessReservationRequest,
  ReservationStatusType,
  ReservationResponse,
} from 'api/lib/reservations';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevron-down.svg';
import { useProcessReservation } from 'common/hooks/mutations/useProcessReservation';
import { useSelectedShop } from 'common/stores/authStore';
import { queryKeys } from 'common/utils/constants';
import { Button } from 'components/Button';
import { flexSet } from 'styles/mixin';

export interface ReservationCardProps extends Reservation {
  currentPageIndex: number;
}

/**
 * 예약 정보 카드 컴포넌트
 */
export const ReservationCard: React.FC<ReservationCardProps> = ({
  id,
  storeSpaceName,
  reservationUnitReservedByUser,
  currentPageIndex,
  startSchedule,
  endSchedule,
  reservationStatus,
  createdAt,
  name,
  reservedPlace,
}) => {
  const theme = useTheme();
  const [isOpened, setIsOpened] = useState(false);
  const { mutate: processReservationMutate } = useProcessReservation();
  const { storeId: shopId } = useSelectedShop();

  const handleToggleDetail = () => {
    setIsOpened((prev) => !prev);
  };

  const date = dayjs(startSchedule).format('YY년 M월 D일');
  const startUsingTime = dayjs(startSchedule).format('hh:mm');
  const endUsingTime = dayjs(endSchedule).format('hh:mm');

  const queryClient = useQueryClient();

  const handleProcessReservation = ({
    reservationId,
    isApproved,
  }: ProcessReservationRequest) => {
    processReservationMutate(
      { reservationId, isApproved, shopId },
      {
        onSuccess() {
          queryClient.setQueryData(
            [queryKeys.GET_RESERVATIONS, { type: 'pending' }],
            (data: InfiniteData<ReservationResponse> | undefined) => {
              if (!data) return data;
              return {
                pages: deleteProcessedItem(
                  data.pages,
                  currentPageIndex - 1,
                  reservationId,
                ),
                pageParams: data.pageParams,
              };
            },
          );
        },
      },
    );
  };

  return (
    <Wrap>
      <Header>
        <StatusTag $reservationStatus={reservationStatus}>
          {getReservationStatusText(reservationStatus)}
        </StatusTag>
        <CreatedText>{dayjs(createdAt).format('M월 D일 H:m')}</CreatedText>
      </Header>
      <Tab onClick={handleToggleDetail}>
        <Name>{name}님</Name>
        <Circle $isActive={reservationStatus === '대기'} />
        <ReservationPlace>
          {reservedPlace}
          {reservationUnitReservedByUser === '좌석' && '번'}
          {id}
        </ReservationPlace>
        <ChevronDownIcon
          stroke={`${theme.palette.grey[300]}`}
          width='4rem'
          height='4rem'
          {...(isOpened && { transform: 'rotate(180)' })}
        />
      </Tab>
      {isOpened && (
        <>
          <Body>
            <TextRow>
              <LabelText>· 신청한 공간</LabelText>
              <ValueText>{storeSpaceName}</ValueText>
            </TextRow>
            <TextRow>
              <LabelText>· 신청한 {reservationUnitReservedByUser}</LabelText>
              <ValueText>{reservedPlace}</ValueText>
            </TextRow>
            <TextRow>
              <LabelText>· 희망 이용 날짜</LabelText>
              <ValueText>{date}</ValueText>
            </TextRow>
            <TextRow>
              <LabelText>· 희망 이용 시간</LabelText>
              <ValueText>{`${startUsingTime} ~ ${endUsingTime}`}</ValueText>
            </TextRow>
          </Body>
          {reservationStatus === '대기' ? (
            <BtnsRow>
              <StyledBtn
                backgroundColor={`${theme.palette.grey[100]}`}
                color={`${theme.palette.grey[400]}`}
                onClick={() =>
                  handleProcessReservation({
                    reservationId: id,
                    isApproved: false,
                    shopId,
                  })
                }
              >
                거절
              </StyledBtn>
              <StyledBtn
                onClick={() =>
                  handleProcessReservation({
                    reservationId: id,
                    isApproved: true,
                    shopId,
                  })
                }
              >
                수락
              </StyledBtn>
            </BtnsRow>
          ) : (
            <Footer>
              {reservationStatus === '승인'
                ? '예약이 승인된 고객입니다.'
                : reservationStatus === '거절'
                ? '예약이 거절된 고객입니다.'
                : '예약이 취소된 고객입니다.'}
            </Footer>
          )}
        </>
      )}
    </Wrap>
  );
};

const getReservationStatusText = (reservationStatus: ReservationStatusType) => {
  if (reservationStatus === '대기') {
    return '예약 대기 중';
  }
  if (reservationStatus === '취소') {
    return '예약 취소';
  }
  if (reservationStatus === '거절') {
    return '예약 거절';
  }
  if (reservationStatus === '승인') {
    return '예약 완료';
  }
};

const deleteProcessedItem = (
  oldPageArray: ReservationResponse[],
  arrayIndex: number,
  reservationId: number,
): ReservationResponse[] => {
  const filteredContent = oldPageArray[arrayIndex].content.filter(
    (reservation) => reservation.id !== reservationId,
  );
  const newPage = { ...oldPageArray[arrayIndex], content: filteredContent };
  const copied = [...oldPageArray];
  copied.splice(arrayIndex, 1, newPage);

  return copied;
};

const Wrap = styled.li`
  width: 100%;
  padding: 2.4rem;

  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 0.8rem;

  & + & {
    margin-top: 1.6rem;
  }
`;

const Header = styled.div`
  ${flexSet('space-between', 'center')};
  margin-bottom: 0.6rem;
`;
const StatusTag = styled.span<{ $reservationStatus: ReservationStatusType }>`
  padding: 0.6rem 0.8rem;
  border-radius: 0.4rem;

  font-size: 1.4rem;
  font-weight: 400;
  line-height: normal;

  // 승인, 거절
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  color: ${({ theme }) => theme.palette.grey[500]};

  ${({ theme, $reservationStatus }) => {
    if ($reservationStatus === '대기')
      return css`
        background-color: rgba(255, 141, 78, 0.15);
        border: 1px solid ${theme.palette.primary.orange};
        color: ${theme.palette.primary.orange};
      `;
    if ($reservationStatus === '취소')
      return css`
        background-color: ${theme.palette.grey[200]};
        border: 1px solid ${theme.palette.grey[300]};
        color: ${theme.palette.grey[500]};
      `;
  }}
`;

const CreatedText = styled.div`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: normal;
`;

const Tab = styled.button`
  width: 100%;
  ${flexSet('space-between', 'center')}
`;

const Name = styled.span`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 2.4rem;
  font-weight: 700;
  line-height: normal;
`;

const Circle = styled.div<{ $isActive: boolean }>`
  width: 0.8rem;
  height: 0.8rem;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.palette.primary.orange : theme.palette.grey[300]};
  border-radius: 50%;

  margin-left: 0.8rem;
  margin-right: 0.4rem;
`;

const ReservationPlace = styled.span`
  margin-right: auto;

  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: normal;
`;

const Body = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 2.4rem;

  width: 100%;
  padding: 1.6rem 1.2rem;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const TextRow = styled.div`
  display: flex;

  & + & {
    margin-top: 0.8rem;
  }
`;

const LabelText = styled.div`
  flex: 1.3;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: normal;
`;
const ValueText = styled.div`
  flex: 2;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: normal;
`;

const Footer = styled.div`
  padding: 1.6rem 0;
  text-align: center;

  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.palette.grey[100]};

  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.grey[400]};
`;
const BtnsRow = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const StyledBtn = styled(Button)`
  flex: 1;
  font-size: 1.6rem;
`;
