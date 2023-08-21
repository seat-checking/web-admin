import styled from 'styled-components';
import type React from 'react';
import { ChairBody } from 'pages/LayoutSettingPage/components/Popover/ChairBody';
import { Header } from 'pages/LayoutSettingPage/components/Popover/Header';
import { TableBody } from 'pages/LayoutSettingPage/components/Popover/TableBody';
import { TABLE_SIZE_PX } from 'pages/LayoutSettingPage/utils/constants';

type PopoverProps = {
  content?: string;
};

export const ChairPopover: React.FC<PopoverProps> = ({ content }) => {
  return (
    <Container>
      <Balloon>
        {content}
        <Header number={152} />
        {/* <ChairBody defaultNumber={152} /> */}
        <TableBody />
      </Balloon>
      <Tail />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: ${TABLE_SIZE_PX}px;
`;

const Balloon = styled.div`
  position: relative;
  padding: 0.8rem;
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
