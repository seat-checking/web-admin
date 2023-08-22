import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import type { ComponentPropsWithRef } from 'react';
import { Popover } from 'pages/LayoutSettingPage/components/Popover';
import { ChairBody } from 'pages/LayoutSettingPage/components/Popover/ChairBody';
import { useSelectItem } from 'pages/LayoutSettingPage/stores/selectItemStore';
import {
  CHAIR_BORDER_PX,
  CHAIR_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';
import { flexSet } from 'styles/mixin';

interface ChairItemProps extends ComponentPropsWithRef<'div'> {
  isClickable: boolean;
  id: string;
}
// Chair Component
export const ChairItem = forwardRef<HTMLDivElement, ChairItemProps>(
  ({ isClickable, id, ...rest }, ref) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState('');
    const { selectedItem, setSelectedItem } = useSelectItem();

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
      if (ref && typeof ref !== 'function' && ref.current) {
        const { transform } = ref.current.style;
        setPopoverPosition(transform);
      }
      setSelectedItem(id);
    };

    return (
      <>
        <ChairBorder {...rest} ref={ref} onClick={handleTogglePopover}>
          <Chair isClickable={isClickable} />
        </ChairBorder>
        {isPopoverOpen && (
          <Popover
            transform={popoverPosition}
            onClose={() => setIsPopoverOpen(false)}
          >
            <ChairBody />
          </Popover>
        )}
      </>
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
