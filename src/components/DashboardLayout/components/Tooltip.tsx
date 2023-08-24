import styled from 'styled-components/macro';
import { ALERT_ICON_WIDTH_REM } from 'components/DashboardLayout/utils/constants';

/**
 * 일시정지 툴팁
 */
export const Tooltip: React.FC = () => {
  return (
    <Container>
      <Balloon>일시정지 설명</Balloon>
      <Tail />
    </Container>
  );
};

const BALLOON_WIDTH_REM = 9;
const BALLOON_HEIGHT_REM = 4.7;

const Container = styled.div`
  position: absolute;
  top: -${BALLOON_HEIGHT_REM}rem;
  left: calc(-${BALLOON_WIDTH_REM / 2}rem + ${ALERT_ICON_WIDTH_REM / 2}rem);

  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Balloon = styled.div`
  width: ${BALLOON_WIDTH_REM}rem;
  white-space: nowrap;
  position: relative;

  padding: 0.8rem;
  background-color: ${({ theme }) => theme.palette.grey[400]};
  border-radius: 0.4rem;

  color: white;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Tail = styled.div`
  position: relative;
  top: -0.1rem;
  width: 0;
  height: 0;
  border-left: 0.6rem solid transparent;
  border-right: 0.6rem solid transparent;
  border-top: 0.8rem solid ${({ theme }) => theme.palette.grey[400]};

  z-index: 100;
`;
