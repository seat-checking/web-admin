import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import type { InfiniteData } from '@tanstack/react-query';
import type { DropdownShop } from 'common/utils/types';
import type { ChangeEvent } from 'react';
import { useToggleCloseToday } from 'common/hooks/mutations/useToggleCloseToday';
import { queryKeys } from 'common/utils/constants';

interface ToggleProps {
  shopId: number;
  isDefaultChecked: boolean;
  pageIdx: number;
  itemIdx: number;
  refetch: () => void;
}

/**
 * 오늘 영업 임시 중단 여부 토글
 */
export const Toggle: React.FC<ToggleProps> = ({
  shopId,
  isDefaultChecked,
  pageIdx,
  itemIdx,
  refetch,
}) => {
  const [checked, setChecked] = useState(isDefaultChecked);
  const queryClient = useQueryClient();

  const { mutate: toggleMutate } = useToggleCloseToday();

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setChecked(isChecked);

    // isClosedToday 는 체크된 상태와 반대임
    const isClosedToday = !isChecked;
    if (!isClosedToday) {
      toggleMutate(
        { shopId, isClosedToday },
        {
          onSuccess() {
            // 오늘 영업 on 시켰으면 현재 운영 중 여부를 다시 받아와야 하므로 API 재호출
            refetch();
          },
        },
      );
      return;
    }

    // 오늘 영업 off 시켰으면 isOpenNow도 무조건 false
    queryClient.setQueryData(
      [queryKeys.GET_OWNED_SHOPS],
      (data: InfiniteData<DropdownShop[]> | undefined) => {
        if (!data) return data;

        const copiedPages = [...data.pages];
        copiedPages[pageIdx][itemIdx].isClosedToday = isClosedToday;
        copiedPages[pageIdx][itemIdx].isOpenNow = false;
        return {
          pages: copiedPages,
          pageParams: data.pageParams,
        };
      },
    );
  };

  useEffect(() => {
    return () => {
      if (isDefaultChecked === checked) {
        return;
      }
      // 오늘 영업 off 시킨 경우에는 mutate를 호출하지 않았으므로 여기서 호출해줌
      if (!checked) {
        toggleMutate({ shopId, isClosedToday: true });
      }
    };
  }, [isDefaultChecked, toggleMutate, shopId, checked]);

  return (
    <Wrap
      onClick={(e) => e.stopPropagation()}
      $isInActive={isDefaultChecked == null}
    >
      <input
        role='switch'
        type='checkbox'
        checked={checked}
        onChange={handleToggle}
      />
    </Wrap>
  );
};

const Wrap = styled.div<{ $isInActive: boolean }>`
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

    ${({ $isInActive }) =>
      $isInActive &&
      css`
        pointer-events: none;
      `}
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

  ${({ $isInActive }) =>
    $isInActive &&
    css`
      cursor: not-allowed;
    `}
`;
