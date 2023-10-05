import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetReservations } from 'common/hooks/queries/useGetReservations';
import { useTab } from 'common/hooks/useTab';
import { useSelectedShop } from 'common/stores/authStore';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { ReservationCard } from 'pages/ShopStatusPage/ReservationTab/components/ReservationCard';
import { StatusTabs } from 'pages/ShopStatusPage/ReservationTab/components/StatusTabs';
import {
  ContentWrap,
  EmptyBox,
} from 'pages/ShopStatusPage/ReservationTab/styled';

const reservationStatusPerTab = {
  0: 'pending',
  1: 'processed',
  2: 'all',
} as const;

/**
 * 예약 관리 탭
 */
export const ReservationTab: React.FC = () => {
  const { storeId } = useSelectedShop();

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
  } = useGetReservations(storeId, currentReservationStatusPerTab);

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
        {reservations.pages[0] == null ? (
          <EmptyBox>아직 예약이 없어요.</EmptyBox>
        ) : (
          reservations.pages.map((group) => {
            return (
              <Fragment key={group?.page}>
                {group?.content.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    currentPageIndex={group.page}
                    {...reservation}
                  />
                ))}
              </Fragment>
            );
          })
        )}
        {isFetching && <LoadingSpinner />}
        <div ref={ref} />
      </ContentWrap>
    </>
  );
};
