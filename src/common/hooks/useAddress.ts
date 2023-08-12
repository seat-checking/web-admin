import { EventHandler, useCallback, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import type { ChangeEvent, ChangeEventHandler } from 'react';
import type { Address } from 'react-daum-postcode';

interface UserAddress {
  full: string;
  detailed: string;
}

export const useAddress = () => {
  const open = useDaumPostcodePopup();

  const [address, setAddress] = useState({
    full: '',
    detailed: '',
  });

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress((prev) => ({ ...prev, full: fullAddress }));
  };

  const handleChangeDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({ ...prev, detailed: event.target.value }));
  };

  return { open, address, handleComplete, handleChangeDetail };
};
