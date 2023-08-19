import { useSearchParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import type { EditShopLayout } from 'api/lib/shop';
import type {
  CustomItemLayout,
  ReservationUnit,
} from 'pages/LayoutSettingPage/utils/types';
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

const getReservationUnitString = (reservationUnit: ReservationUnit) => {
  if (reservationUnit.seat && !reservationUnit.space) return '좌석';
  if (!reservationUnit.seat && reservationUnit.space) return '스페이스';
  return '스페이스/좌석';
};

const mappingData = (
  layout: CustomItemLayout[],
  rowCnt: number,
  spaceName: string,
  reservationUnit: ReservationUnit,
) => {
  const request: EditShopLayout = {
    name: spaceName,
    height: rowCnt,
    reservationUnit: getReservationUnitString(reservationUnit),
    tableList: [],
    chairList: [],
  };
  layout.forEach((item) => {
    if (item.sort === 'table') {
      const tableData = {
        storeTableId: item.i,
        tableWidth: item.w,
        tableHeight: item.h,
        tableX: item.x,
        tableY: item.y,
      };
      request.tableList.push(tableData);
    } else {
      const chair = {
        storeChairId: item.i,
        manageId: 0,
        chairX: item.x,
        chairY: item.y,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const spaceId = Number(searchParams.get('space'));
  const layout = useLayout();
  const { isChanged } = useChange();

  const spaceName = useSpaceName();
  const reservationUnit = useReservationUnit();

  const handleSave = () => {
    if (spaceId === TEMPORARY_SPACE_ID) {
      createSpaceMutate(
        mappingData(layout, rowCnt, spaceName, reservationUnit),
      );
      return;
    }
    editLayoutMutate({
      spaceId,
      layout: mappingData(layout, rowCnt, spaceName, reservationUnit),
    });
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
