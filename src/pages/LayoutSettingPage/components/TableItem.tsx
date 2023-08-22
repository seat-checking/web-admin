import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import type { ComponentPropsWithRef } from 'react';
import { Popover } from 'pages/LayoutSettingPage/components/Popover';
import { TableBody } from 'pages/LayoutSettingPage/components/Popover/TableBody';
import { useSelectItem } from 'pages/LayoutSettingPage/stores/selectItemStore';

interface TableItemProps extends ComponentPropsWithRef<'div'> {
  isClickable: boolean;
  id: string;
}

export const TableItem = forwardRef<HTMLDivElement, TableItemProps>(
  ({ isClickable, id, ...rest }, ref) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState('');
    const { setSelectedItem } = useSelectItem();

    const handleTogglePopover = () => {
      setIsPopoverOpen(!isPopoverOpen);
      if (ref && typeof ref !== 'function' && ref.current) {
        const { transform } = ref.current.style;
        setPopoverPosition(transform);
      }
      setSelectedItem(id);
    };

    return (
      <>
        <GridTable
          isClickable={isClickable}
          {...rest}
          ref={ref}
          onClick={handleTogglePopover}
        />
        {isPopoverOpen && (
          <Popover
            transform={popoverPosition}
            onClose={() => setIsPopoverOpen(false)}
          >
            <TableBody />
          </Popover>
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
