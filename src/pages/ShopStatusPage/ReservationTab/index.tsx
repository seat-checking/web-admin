import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetReservations } from 'common/hooks/queries/useGetReservations';
import { useTab } from 'common/hooks/useTab';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { InformationCard } from 'pages/ShopStatusPage/ReservationTab/components/InformationCard';
import { StatusTabs } from 'pages/ShopStatusPage/ReservationTab/components/StatusTabs';
import { ContentWrap } from 'pages/ShopStatusPage/ReservationTab/styled';

const reservationStatusPerTab = {
  0: 'pending',
  1: 'processed',
  2: 'all',
} as const;

/**
 * 예약 관리 탭
 */
export const ReservationTab: React.FC = () => {
  const [ref, inView] = useInView();
  const { activeTab, changeTab } = useTab();

  const currentReservationStatusPerTab =
    reservationStatusPerTab[activeTab as keyof typeof reservationStatusPerTab];

  const {
    data: reservations,
    fetchNextPage,
    status,
    isFetching,
    error,
  } = useGetReservations(currentReservationStatusPerTab);

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      console.log(inView, '무한 스크롤 요청 🎃');
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return status === 'loading' ? (
    <LoadingSpinner />
  ) : status === 'error' ? (
    <p>{error.message}</p>
  ) : (
    <>
      <StatusTabs activeTab={activeTab} onClickTab={changeTab} />
      <ContentWrap>
        {reservations?.pages.map((group) => {
          return (
            <Fragment key={group.page}>
              {group?.content.map((reservation) => (
                <InformationCard
                  key={reservation.id}
                  currentPageIndex={group.page}
                  {...reservation}
                />
              ))}
            </Fragment>
          );
        })}
        {isFetching && <LoadingSpinner />}
        <div ref={ref}>안녕</div>
      </ContentWrap>
    </>
  );
};
