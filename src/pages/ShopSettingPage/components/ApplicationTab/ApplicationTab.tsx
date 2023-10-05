import { useEffect, useState } from 'react';
import type { SuccessOkResponse } from 'api/store/common';
import {
  getRequestInformation,
  type StoreCustomReservationResponse,
} from 'api/store/store';
import { useSelectedShop } from 'common/stores/authStore';
import { InformationAdd } from 'pages/ShopSettingPage/components/ApplicationTab/components/InformationAdd';
import { InformationList } from 'pages/ShopSettingPage/components/ApplicationTab/components/InformationList';

export const ApplicationTab = () => {
  const [data, setData] =
    useState<SuccessOkResponse<StoreCustomReservationResponse> | null>(null);

  const { storeId } = useSelectedShop();

  const fetchData = async () => {
    if (!storeId) {
      console.error('error');
      return;
    }
    try {
      const response = await getRequestInformation({
        storeId: String(storeId),
      });
      setData(response);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <InformationAdd fetchData={fetchData} />
      <InformationList data={data} fetchData={fetchData} />
    </div>
  );
};
