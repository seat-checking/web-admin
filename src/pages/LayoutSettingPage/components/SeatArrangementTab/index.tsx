import { useTheme } from 'styled-components';
import type { CreateShopLayout, ReservationUnit } from 'api/lib/shop';
import type { CustomItemLayout } from 'pages/LayoutSettingPage/utils/types';
import { useCreateSpace } from 'common/hooks/mutations/useCreateSpace';
import { useEditLayout } from 'common/hooks/mutations/useEditLayout';
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
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';
import { useLayout } from 'pages/LayoutSettingPage/stores/layoutStore';
import {
  useReservationUnit,
  useSpaceName,
} from 'pages/LayoutSettingPage/stores/spaceInfoStore';

interface SeatArrangementTabProps {
  changeTab: (index: number) => void;
  rowCnt: number;
}

const mappingData = (
  layout: CustomItemLayout[],
  rowCnt: number,
  name: string,
  reservationUnit: ReservationUnit,
) => {
  const request: CreateShopLayout = {
    name,
    height: rowCnt,
    reservationUnit,
    tableList: [],
    chairList: [],
  };
  layout.forEach(({ i, w, h, x, y, sort, manageId }) => {
    if (sort === 'table') {
      const tableData = {
        i,
        w,
        h,
        x,
        y,
      };
      request.tableList.push(tableData);
    } else {
      const chair = {
        i,
        manageId,
        x,
        y,
      };
      request.chairList.push(chair);
    }
  });
  return request;
};
/**
 * '좌석 설정' > '좌석 배치' 탭 클릭했을 때 보여줄 컴포넌트
 */
export const SeatArrangementTab: React.FC<SeatArrangementTabProps> = ({
  changeTab,
  rowCnt,
}) => {
  const theme = useTheme();
  const { mutate: editLayoutMutate } = useEditLayout();
  const { mutate: createSpaceMutate } = useCreateSpace();
  const { spaceId } = useSpaceId();

  const layout = useLayout();
  const { isChanged, setChange } = useChange();

  const spaceName = useSpaceName();
  const reservationUnit = useReservationUnit();

  const handleSave = () => {
    if (spaceId === TEMPORARY_SPACE_ID) {
      createSpaceMutate(
        mappingData(layout, rowCnt, spaceName, reservationUnit),
      );
      return;
    }
    // editLayoutMutate({
    //   spaceId,
    //   layout: mappingData(layout, rowCnt, spaceName, reservationUnit),
    // });
    setChange(false);
  };

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
        <StyledButton onClick={handleSave} $isChanged={isChanged}>
          {spaceId === TEMPORARY_SPACE_ID ? '생성하기' : '저장하기'}
        </StyledButton>
      </ButtonRow>
    </Wrap>
  );
};
