import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type React from 'react';
import { ChairBody } from 'pages/LayoutSettingPage/components/Popover/ChairBody';
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
  children?: React.ReactNode;
  transform?: string;
  onClose?: () => void;
};

export const Popover: React.FC<PopoverProps> = ({
  children,
  transform,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { selectedItem } = useSelectItem();
  const { getItem } = useLayoutActions();
  const selectedManageId = selectedItem && getItem(selectedItem).manageId;

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
        if (input === '' || !selectedItem) {
          return;
        }
        setManageId(selectedItem, Number(input));
        onClose?.();
      }
    },
    [input, onClose, selectedItem, setManageId],
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
        {/* {children} */}
        <ChairBody manageId={input} setManageId={setInput} />
      </Balloon>
      <Tail />
    </Container>
  );
};

const Container = styled.div<{ transform?: string }>`
  position: absolute;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: ${TABLE_SIZE_PX}px;
  left: -${TABLE_POPOVER_WIDTH_REM / 2}rem; // TODO - 팝업 너비만큼 + 테이블 너비 반
  top: -100px; // TODO - (팝업 높이 만큼 + 여백조금)
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
