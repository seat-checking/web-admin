import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import type { DropdownShop } from 'common/utils/types';
import type { ChangeEvent } from 'react';
import { useToggleCloseToday } from 'common/hooks/mutations/useToggleCloseToday';
import { queryKeys } from 'common/utils/constants';

interface ToggleProps {
  shopId: number;
  isChecked: boolean;
}

/**
 * 오늘 영업 임시 중단 여부 토글
 */
export const Toggle: React.FC<ToggleProps> = ({ shopId, isChecked }) => {
  const isToggledRef = useRef(isChecked);
  const queryClient = useQueryClient();

  const { mutate: toggleMutate } = useToggleCloseToday();

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    isToggledRef.current = event.currentTarget.checked;
  };

  useEffect(() => {
    return () => {
      if (isChecked === isToggledRef.current) {
        return;
      }

      const isClosedToday = isToggledRef.current;

      toggleMutate({ shopId, isClosedToday });

      queryClient.setQueryData(
        [queryKeys.GET_OWNED_SHOPS],
        (data: DropdownShop[] | undefined) => {
          return data?.map((shop) => {
            if (shop.storeId === shopId) {
              const changedShop = { ...shop, isClosedToday };
              if (!isClosedToday) {
                changedShop.isOpenNow = false;
              }
              return changedShop;
            }
            return shop;
          });
        },
      );
    };
  }, [isChecked, toggleMutate, queryClient, shopId]);

  return (
    <Wrap onClick={(e) => e.stopPropagation()}>
      <input
        role='switch'
        type='checkbox'
        defaultChecked={isChecked}
        onChange={handleToggle}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex; // 여백 없애기 위함
  [type='checkbox'] {
    cursor: pointer;
    appearance: none;

    position: relative;
    border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
    width: 4rem;
    height: 2.4rem;
    border-radius: 2.4rem;
    background-color: ${({ theme }) => theme.palette.grey[300]};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      /* transform: scale(0.9); */
      background-color: white;
      transition: all 250ms linear;
    }
  }

  [type='checkbox']:checked {
    background-color: ${({ theme }) => theme.palette.primary.orange};
    border-color: ${({ theme }) => theme.palette.primary.orange};

    &::before {
      left: auto;
      right: 0;
      transition: all 250ms linear;
    }
  }
`;
