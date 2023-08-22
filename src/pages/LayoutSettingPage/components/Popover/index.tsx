import styled from 'styled-components';
import type React from 'react';
import { ChairBody } from 'pages/LayoutSettingPage/components/Popover/ChairBody';
import { Header } from 'pages/LayoutSettingPage/components/Popover/Header';
import { TableBody } from 'pages/LayoutSettingPage/components/Popover/TableBody';
import {
  POPOVER_PADDING_REM,
  TABLE_POPOVER_WIDTH_REM,
  TABLE_SIZE_PX,
} from 'pages/LayoutSettingPage/utils/constants';

type PopoverProps = {
  children?: React.ReactNode;
  transform?: string;
};

export const Popover: React.FC<PopoverProps> = ({ children, transform }) => {
  return (
    <Container transform={transform}>
      <Balloon>
        <Header number={152} />
        {children}
        {/* <ChairBody defaultNumber={152} /> */}
      </Balloon>
      <Tail />
    </Container>
  );
};

const Container = styled.div<{ transform?: string }>`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* bottom: ${TABLE_SIZE_PX}px; */
  left: -${TABLE_POPOVER_WIDTH_REM / 2}rem; // TODO - 팝업 너비만큼 + 테이블 너비 반
  top: -100px; // TODO - (팝업 높이 만큼 + 여백조금)
  transform: ${({ transform }) => transform};
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
