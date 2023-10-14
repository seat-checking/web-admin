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
  const { selectedId } = useSelectItem();
  const { getItem } = useLayoutActions();

  if (!selectedId) return null;
  const selectedItem = getItem(selectedId);

  return (
    <Wrap>
      <Row>
        <Label>가로 길이</Label>
        <SizeText>{selectedItem.w}</SizeText>
      </Row>
      <Row>
        <Label>세로 길이</Label>
        <SizeText>{selectedItem.h}</SizeText>
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

const SizeText = styled.div`
  width: 4rem;
  padding: 0.4rem 0;

  background-color: ${({ theme }) => theme.palette.grey[50]};
  text-align: center;

  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
`;
