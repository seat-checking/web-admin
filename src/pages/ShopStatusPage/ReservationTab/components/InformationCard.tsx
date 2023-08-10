import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevron-down.svg';
import { Button } from 'components/Button';
import { flexSet } from 'styles/mixin';

export interface InformationCardProps {
  id: number;
  name: string;
  reservationStatus: string;
  storeSpaceName: string; // 공간이름
  reservationUnit: string; // 좌석 | 스페이스
  manageId: number; // 좌석 번호
  reservationStartDateAndTime: string;
  reservationEndDateAndTime: string;
  createdAt: string;
}
/* eslint-disable react/destructuring-assignment */

/**
 * 예약 정보 카드 컴포넌트
 */
export const InformationCard: React.FC<InformationCardProps> = (props) => {
  const theme = useTheme();
  const [isOpened, setIsOpened] = useState(false);

  const handleToggleDetail = () => {
    setIsOpened((prev) => !prev);
  };
  return (
    <Wrap>
      <Header>
        <StatusTag>{props.reservationStatus}</StatusTag>
        <CreatedText>{props.createdAt}</CreatedText>
      </Header>
      <Tab onClick={handleToggleDetail}>
        <Name>{props.name}님</Name>
        <Circle />
        <Reservation>{props.manageId}번</Reservation>
        <ChevronDownIcon
          stroke={`${theme.palette.grey[300]}`}
          width='4rem'
          height='4rem'
          {...(isOpened && { transform: 'rotate(180)' })}
        />
      </Tab>
      {isOpened && (
        <>
          <Body>
            <TextRow>
              <LabelText>· 신청한 공간</LabelText>
              <ValueText>{props.storeSpaceName}</ValueText>
            </TextRow>
            <TextRow>
              <LabelText>· 신청한 {props.reservationUnit}</LabelText>
              <ValueText>{props.manageId}</ValueText>
            </TextRow>
            <TextRow>
              <LabelText>· 희망 이용 날짜</LabelText>
              <ValueText>{props.manageId}</ValueText>
            </TextRow>
            <TextRow>
              <LabelText>· 희망 이용 시간</LabelText>
              <ValueText>{props.manageId}</ValueText>
            </TextRow>
          </Body>
          <BtnsRow>
            <StyledBtn
              backgroundColor={`${theme.palette.grey[100]}`}
              color={`${theme.palette.grey[400]}`}
            >
              거절
            </StyledBtn>
            <StyledBtn>수락</StyledBtn>
          </BtnsRow>
        </>
      )}
    </Wrap>
  );
};

const Wrap = styled.li`
  width: 100%;
  padding: 2.4rem;

  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 0.8rem;

  & + & {
    margin-top: 1.6rem;
  }
`;

const Header = styled.div`
  ${flexSet('space-between', 'center')};
  margin-bottom: 0.6rem;
`;
const StatusTag = styled.span`
  padding: 0.6rem 0.8rem;
  border-radius: 0.4rem;

  background-color: ${({ theme }) => theme.palette.grey[100]};
  background-color: rgba(255, 141, 78, 0.15);
  border: 1px solid ${({ theme }) => theme.palette.primary.orange};

  color: ${({ theme }) => theme.palette.primary.orange};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: normal;
`;

const CreatedText = styled.div`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: normal;
`;

const Tab = styled.button`
  width: 100%;
  ${flexSet('space-between', 'center')}
`;

const Name = styled.span`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 2.4rem;
  font-weight: 700;
  line-height: normal;
`;

const Circle = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background-color: ${({ theme }) => theme.palette.primary.orange};
  border-radius: 50%;

  margin-left: 0.8rem;
  margin-right: 0.4rem;
`;

const Reservation = styled.span`
  margin-right: auto;

  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: normal;
`;

const Body = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 2.4rem;

  width: 100%;
  padding: 1.6rem 1.2rem;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const TextRow = styled.div`
  display: flex;

  & + & {
    margin-top: 0.8rem;
  }
`;

const LabelText = styled.div`
  flex: 1.2;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: normal;
`;
const ValueText = styled.div`
  flex: 2;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: normal;
`;

const BtnsRow = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const StyledBtn = styled(Button)`
  flex: 1;
  font-size: 1.6rem;
`;
