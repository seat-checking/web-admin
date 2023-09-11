import { useRef } from 'react';
import styled from 'styled-components/macro';
import type React from 'react';
import { CircledArrowButton } from 'components/CircledArrowButton';
import { useLayoutActions } from 'pages/LayoutSettingPage/stores/layoutStore';
import { useSelectItem } from 'pages/LayoutSettingPage/stores/selectItemStore';
import { TABLE_POPOVER_BODY_WIDTH_REM } from 'pages/LayoutSettingPage/utils/constants';

type SizeType = 'w' | 'h';
type CommandType = 'UP' | 'DOWN';
/**
 * 테이블 클릭했을 때의 팝오버 바디 영역
 */
export const TableBody: React.FC = () => {
  const { setTableSize: setTableHeight } = useLayoutActions();
  const { selectedId } = useSelectItem();
  const { getItem } = useLayoutActions();

  const inputRefs = useRef({
    w: useRef<HTMLInputElement>(null),
    h: useRef<HTMLInputElement>(null),
  });

  if (!selectedId) return null;
  const selectedItem = getItem(selectedId);

  const handleSizeWithBtn = (size: SizeType, command: CommandType) => {
    const currentRef = inputRefs.current?.[size]?.current;
    if (!currentRef) {
      return;
    }
    if (command === 'DOWN') {
      if (selectedItem[size] <= 1) {
        return;
      }

      currentRef.value = String(selectedItem[size] - 1);
      setTableHeight(selectedId, selectedItem[size] - 1, size);
      return;
    }
    currentRef.value = String(selectedItem[size] + 1);
    setTableHeight(selectedId, selectedItem[size] + 1, size);
  };

  const handleSizeWithEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    size: SizeType,
  ) => {
    if (event.key !== 'Enter') {
      return;
    }
    const value = Number(event.currentTarget.value);
    if (value <= 0) {
      event.currentTarget.value = String(selectedItem[size]);
      return;
    }
    setTableHeight(selectedId, value, size);
  };

  return (
    <Wrap>
      <Row>
        <Label>가로 길이</Label>
        <CircledArrowButton
          direction='LEFT'
          onClick={() => handleSizeWithBtn('w', 'DOWN')}
        />
        <Input
          placeholder=''
          ref={inputRefs.current.w}
          defaultValue={selectedItem.w}
          onKeyUp={(e) => handleSizeWithEnter(e, 'w')}
        />
        <CircledArrowButton
          direction='RIGHT'
          onClick={() => handleSizeWithBtn('w', 'UP')}
        />
      </Row>
      <Row>
        <Label>세로 길이</Label>
        <CircledArrowButton
          direction='LEFT'
          onClick={() => handleSizeWithBtn('h', 'DOWN')}
        />
        <Input
          placeholder=''
          ref={inputRefs.current.h}
          defaultValue={selectedItem.h}
          onKeyUp={(e) => handleSizeWithEnter(e, 'h')}
        />
        <CircledArrowButton
          direction='RIGHT'
          onClick={() => handleSizeWithBtn('h', 'UP')}
        />
      </Row>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: ${TABLE_POPOVER_BODY_WIDTH_REM}rem;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 1.2rem;

  & + & {
    margin-top: 1.2rem;
  }
`;

const Label = styled.span`
  color: white;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
`;

const Input = styled.input`
  width: 4rem;
  padding: 0.4rem 0;

  background-color: ${({ theme }) => theme.palette.grey[50]};
  text-align: center;

  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
`;
