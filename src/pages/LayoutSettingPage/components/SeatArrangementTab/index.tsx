import { useTheme } from 'styled-components';

import { TEMPORARY_SPACE_ID } from 'common/utils/constants';
import {
  Door,
  DoorChairBox,
  LabelText,
  SeatCountBox,
  SeatCountWrap,
  TableBox,
  TableRow,
  Wrap,
  DoorChairRow,
  DoorText,
  ButtonRow,
  StyledButton,
  DescriptionText,
} from 'pages/LayoutSettingPage/components/SeatArrangementTab/SeatArrangementTab.styled';
import { Chair } from 'pages/LayoutSettingPage/components/SeatArrangementTab/components/Chair';
import { Table } from 'pages/LayoutSettingPage/components/SeatArrangementTab/components/Table';
import { useSaveLayout } from 'pages/LayoutSettingPage/hooks/useSaveLayout';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

interface SeatArrangementTabProps {
  changeTab: (index: number) => void;
}

/**
 * '좌석 설정' > '좌석 배치' 탭 클릭했을 때 보여줄 컴포넌트
 */
export const SeatArrangementTab: React.FC<SeatArrangementTabProps> = ({
  changeTab,
}) => {
  const theme = useTheme();

  const saveLayout = useSaveLayout();
  const { isChanged } = useChange();
  const { spaceId } = useSpaceId();

  const handleChangePreviousTab = () => {
    changeTab(0);
  };
  return (
    <Wrap>
      <DescriptionText>
        개인이 앉을 수 있는 좌석을 기준으로
        <br />
        마우스로 오른쪽에 끌어서 넣어주세요.
      </DescriptionText>
      <SeatCountWrap>
        <SeatCountBox>총 좌석:144개</SeatCountBox>
        <SeatCountBox>배치한 좌석:111개</SeatCountBox>
      </SeatCountWrap>
      <LabelText>책상</LabelText>
      <TableRow>
        <TableBox>
          <Table width={1} height={1} />
        </TableBox>
        <TableBox>
          <Table width={2} height={1} />
        </TableBox>
        <TableBox>
          <Table width={1} height={2} />
        </TableBox>
        <TableBox>
          <Table width={2} height={2} />
        </TableBox>
      </TableRow>
      <DoorChairRow>
        <div>
          <LabelText>매장</LabelText>
          <DoorChairBox>
            <div>
              <Door />
              <DoorText>입구</DoorText>
            </div>
          </DoorChairBox>
        </div>
        <div>
          <LabelText>의자</LabelText>
          <DoorChairBox>
            <Chair />
          </DoorChairBox>
        </div>
      </DoorChairRow>

      <ButtonRow>
        <StyledButton
          onClick={handleChangePreviousTab}
          backgroundColor={theme.palette.grey[100]}
          color={theme.palette.grey[400]}
        >
          이전으로
        </StyledButton>
        <StyledButton onClick={saveLayout} $isChanged={isChanged}>
          {spaceId === TEMPORARY_SPACE_ID ? '생성하기' : '저장하기'}
        </StyledButton>
      </ButtonRow>
    </Wrap>
  );
};
