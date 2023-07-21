import { useTheme } from 'styled-components';
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
} from 'pages/LayoutSettingPage/components/SeatLayoutTab/SeatLayoutTab.styled';
import { Chair } from 'pages/LayoutSettingPage/components/SeatLayoutTab/components/Chair';
import { Table } from 'pages/LayoutSettingPage/components/SeatLayoutTab/components/Table';

/**
 * '좌석 설정' > '좌석 배치' 탭 클릭했을 때 보여줄 컴포넌트
 */
export const SeatLayoutTab: React.FC = () => {
  const theme = useTheme();

  const handleSave = () => {
    // ShopApi.saveShopLayout(1);
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
          onClick={handleSave}
          backgroundColor={theme.palette.grey[100]}
          color={theme.palette.grey[400]}
        >
          이전으로
        </StyledButton>
        <StyledButton onClick={handleSave}>저장하기</StyledButton>
      </ButtonRow>
    </Wrap>
  );
};
