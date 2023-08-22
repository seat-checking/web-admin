import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import type { ComponentPropsWithRef, Ref } from 'react';
import { Popover } from 'pages/LayoutSettingPage/components/Popover';
import { ChairBody } from 'pages/LayoutSettingPage/components/Popover/ChairBody';
import {
  CHAIR_BORDER_PX,
  CHAIR_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';
import { flexSet } from 'styles/mixin';

interface ChairItemProps extends ComponentPropsWithRef<'div'> {
  isClickable: boolean;
}
// Chair Component
export const ChairItem = forwardRef(
  ({ isClickable, ...rest }: ChairItemProps, ref: Ref<HTMLDivElement>) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const handleTogglePopover = () => {
      setIsPopoverOpen(!isPopoverOpen);
    };

    return (
      <ChairBorder {...rest} ref={ref} onClick={handleTogglePopover}>
        <Chair isClickable={isClickable} />
        {isPopoverOpen && (
          <Popover>
            <ChairBody />
          </Popover>
        )}
      </ChairBorder>
    );
  },
);

// 의자 바깥에 투명한 테두리를 넣기 위함
export const ChairBorder = styled.div`
  ${flexSet()}
`;

// 검정 테두리를 준 의자 영역
export const Chair = styled.div<{ isClickable: boolean }>`
  background-color: ${(props): string => props.theme.palette.grey[100]};

  width: ${CHAIR_SIZE_PX - CHAIR_BORDER_PX}px;
  height: ${CHAIR_SIZE_PX - CHAIR_BORDER_PX}px;

  border: ${CHAIR_BORDER_PX}px solid ${({ theme }) => theme.palette.black.main};
  border-radius: 50%;

  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;
