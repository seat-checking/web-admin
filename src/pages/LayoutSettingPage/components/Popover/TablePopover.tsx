import { useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import type React from 'react';
import { Header } from 'pages/LayoutSettingPage/components/Popover/Header';
import { TableBody } from 'pages/LayoutSettingPage/components/Popover/TableBody';
import { useLayoutActions } from 'pages/LayoutSettingPage/stores/layoutStore';
import { useSelectItem } from 'pages/LayoutSettingPage/stores/selectItemStore';
import {
  POPOVER_PADDING_REM,
  TABLE_POPOVER_WIDTH_REM,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

type PopoverProps = {
  transform: string;
  onClose: () => void;
};

export const TablePopover: React.FC<PopoverProps> = ({
  transform,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { selectedId } = useSelectItem();
  const { getItem } = useLayoutActions();
  const tableWidth =
    (selectedId && getItem(selectedId).w * TABLE_SIZE_PX) || TABLE_SIZE_PX;
  const tableHeight =
    (selectedId && getItem(selectedId).h * TABLE_SIZE_PX) || TABLE_SIZE_PX;

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Container
      ref={containerRef}
      $transform={transform}
      $tableWidth={tableWidth}
      $tableHeight={tableHeight}
    >
      <Balloon>
        <Header />
        <TableBody />
      </Balloon>
      <Tail />
    </Container>
  );
};

const TABLE_POPOVER_HEIGHT_REM = 11.2;

const Container = styled.div<{
  $transform?: string;
  $tableWidth?: number;
  $tableHeight?: number;
}>`
  position: absolute;
  height: ${TABLE_POPOVER_HEIGHT_REM}rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  top: -${TABLE_POPOVER_HEIGHT_REM + 1}rem;
  transform: ${({ $transform }) => $transform};

  ${({ $tableWidth }) =>
    $tableWidth &&
    css`
      left: calc(-${TABLE_POPOVER_WIDTH_REM / 2}rem + ${$tableWidth / 2}px); //
    `}

  z-index: 1000;
`;

const Balloon = styled.div`
  position: relative;
  padding: ${POPOVER_PADDING_REM}rem;
  background-color: ${({ theme }) => theme.palette.grey[500]};
  border-radius: 5px;
  color: white;
  font-size: 16px;
  text-align: center;
`;

const Tail = styled.div`
  position: relative;
  top: -0.1rem;
  width: 0;
  height: 0;
  border-left: 0.6rem solid transparent;
  border-right: 0.6rem solid transparent;
  border-top: 0.9rem solid ${({ theme }) => theme.palette.grey[500]};

  z-index: 100;
`;
