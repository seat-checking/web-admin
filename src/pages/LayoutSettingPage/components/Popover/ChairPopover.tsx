import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type React from 'react';
import { ChairBody } from 'pages/LayoutSettingPage/components/Popover/ChairBody';
import { Header } from 'pages/LayoutSettingPage/components/Popover/Header';
import { useLayoutActions } from 'pages/LayoutSettingPage/stores/layoutStore';
import { useSelectItem } from 'pages/LayoutSettingPage/stores/selectItemStore';
import {
  CHAIR_POPOVER_WIDTH_REM,
  CHAIR_SIZE_PX,
  POPOVER_PADDING_REM,
  TABLE_POPOVER_WIDTH_REM,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

type PopoverProps = {
  children?: React.ReactNode;
  transform?: string;
  onClose?: () => void;
};

export const ChairPopover: React.FC<PopoverProps> = ({
  children,
  transform,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { selectedId } = useSelectItem();
  const { getItem } = useLayoutActions();
  const selectedManageId = selectedId && getItem(selectedId).manageId;

  const [input, setInput] = useState(
    selectedManageId ? String(selectedManageId) : '',
  );
  const { setManageId } = useLayoutActions();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (input === '' || !selectedId) {
          return;
        }
        setManageId(selectedId, Number(input));
        onClose?.();
      }
    },
    [input, onClose, selectedId, setManageId],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Container transform={transform} ref={containerRef}>
      <Balloon>
        <Header number={152} />
        <ChairBody manageId={input} setManageId={setInput} onClose={onClose} />
      </Balloon>
      <Tail />
    </Container>
  );
};

const CHAIR_POPOVER_HEIGHT_REM = 7.3;

const Container = styled.div<{ transform?: string }>`
  position: absolute;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;

  height: ${CHAIR_POPOVER_HEIGHT_REM}rem;
  left: calc(
    -${CHAIR_POPOVER_WIDTH_REM / 2}rem + ${TABLE_SIZE_PX / 2}px
  ); //  팝업 너비 반 + 한셀 너비 반
  top: -${CHAIR_POPOVER_HEIGHT_REM}rem;
  transform: ${({ transform }) => transform};

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
