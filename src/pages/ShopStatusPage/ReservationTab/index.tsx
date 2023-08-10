import { useState } from 'react';
import db from 'api/fake-server/db.json';
import { useTab } from 'common/hooks/useTab';
import { InformationCard } from 'pages/ShopStatusPage/ReservationTab/components/InformationCard';
import { StatusTabs } from 'pages/ShopStatusPage/ReservationTab/components/StatusTabs';

import { ContentWrap } from 'pages/ShopStatusPage/ReservationTab/styled';

/**
 * 예약 관리 탭
 */
export const ReservationTab: React.FC = () => {
  const { activeTab, changeTab } = useTab();
  const [reservations, setReservations] = useState(
    db.reservationResponseListPending,
  );

  return (
    <>
      <StatusTabs activeTab={activeTab} onClickTab={changeTab} />
      <ContentWrap>
        {reservations.map((reservation) => (
          <InformationCard {...reservation} />
        ))}
      </ContentWrap>
    </>
  );
};
