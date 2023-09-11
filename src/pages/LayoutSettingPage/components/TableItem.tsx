import { forwardRef } from 'react';
import styled from 'styled-components';
import type { ComponentPropsWithRef } from 'react';
import { TablePopover } from 'pages/LayoutSettingPage/components/Popover/TablePopover';

interface TableItemProps extends ComponentPropsWithRef<'div'> {
  id: string;
  isClickable: boolean;
  isTableClicked: boolean;
  onClose: () => void;
}

export const TableItem = forwardRef<HTMLDivElement, TableItemProps>(
  ({ isClickable, id, isTableClicked, onClose, ...rest }, ref) => {
    const isPopoverOpen = isClickable && isTableClicked;

    const popoverPosition =
      (ref && typeof ref !== 'function' && ref.current?.style.transform) || '';

    return (
      <>
        <GridTable isClickable={isClickable} {...rest} ref={ref} />
        {isPopoverOpen && (
          <TablePopover transform={popoverPosition} onClose={onClose} />
        )}
      </>
    );
  },
);

export const GridTable = styled.div<{ isClickable: boolean }>`
  position: relative;
  background-color: ${(props): string => props.theme.palette.grey[100]};

  border-color: ${({ theme }) => theme.palette.black.main};
  border-width: 1px;
  border-style: solid;

  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;
