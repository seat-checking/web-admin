import styled from 'styled-components';
import { useGetSeatStatistics } from 'common/hooks/queries/useGetSeatStatistics';
import { flexSet } from 'styles/mixin';

/**
 * 좌석 정보 탭
 */
export const SeatTab: React.FC = () => {
  const { data: seatStatistics } = useGetSeatStatistics();

  return (
    <Wrap>
      <SeatCountWrap>
        <SeatCount>총 좌석 : {seatStatistics?.totalNumberOfSeats}개</SeatCount>
        <SeatCount>
          잔여 좌석 : {seatStatistics?.numberOfRemainingSeats}개
        </SeatCount>
      </SeatCountWrap>
      <AverageText>
        좌석 평균 이용 시간 : {seatStatistics?.averageSeatUsageMinute}분
      </AverageText>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 2.4rem 4.3rem;
`;

const SeatCountWrap = styled.div`
  display: flex;
  gap: 1.3rem;

  margin-bottom: 1.6rem;
`;

const SeatCount = styled.div`
  flex: 1;
  ${flexSet()};

  padding: 1.8rem 0;

  border-radius: 0.7rem;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: white;

  font-size: 1.7rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const AverageText = styled.div`
  ${flexSet()}
  padding: 1.8rem 0;

  border-radius: 0.7rem;
  border: 2px solid ${({ theme }) => theme.palette.primary.orange};
  background-color: white;

  font-size: 1.7rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.primary.orange};
`;
