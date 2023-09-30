import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetReservations } from 'common/hooks/queries/useGetReservations';
import { useTab } from 'common/hooks/useTab';
import { STORAGE } from 'common/utils/constants';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { ReservationCard } from 'pages/ShopStatusPage/ReservationTab/components/ReservationCard';
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
  const shopId = Number(localStorage.getItem(STORAGE.storeId));
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
  } = useGetReservations(shopId, currentReservationStatusPerTab);

  useEffect(() => {
    if (inView) {
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
                <ReservationCard
                  key={reservation.id}
                  currentPageIndex={group.page}
                  {...reservation}
                />
              ))}
            </Fragment>
          );
        })}
        {isFetching && <LoadingSpinner />}
        <div ref={ref} />
      </ContentWrap>
    </>
  );
};
