import styled from 'styled-components/macro';
import { Button } from 'components/Button';
import { flexSet, grayBorderBoxStyle } from 'styles/mixin';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%; // 부모에 height: 100 줘야 자식에 flex-grow 적용 가능
  padding: 2.3rem;
`;
export const SeatCountWrap = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 4.8rem;

  display: flex;
  gap: 1.3rem;
`;

export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-weight: 400;
  font-size: 2rem;
  line-height: normal;

  text-align: center;
`;

export const SeatCountBox = styled.div`
  ${grayBorderBoxStyle}
  ${flexSet()}
  flex: 1;
  height: 6.2rem;

  font-weight: 500;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const LabelText = styled.p`
  margin-bottom: 0.8rem;

  font-weight: 400;
  font-size: 2rem;
  color: ${({ theme }) => theme.palette.grey[300]};
`;

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 4.8rem;
`;

export const TableBox = styled.div`
  ${grayBorderBoxStyle}
  ${flexSet()}
  width: 9.6rem;
  height: 9.6rem;
  border-radius: 0.5rem;
`;

export const DoorChairRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DoorChairBox = styled.div`
  ${grayBorderBoxStyle}
  ${flexSet()}
  width: 19.9rem;
  height: 9.6rem;
  border-radius: 0.5rem;
`;

export const Door = styled.div`
  width: 6.4rem;
  height: 1.3rem;
  background-color: black;
`;

export const DoorText = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
  text-align: center;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 2rem;

  margin-top: auto;
`;

export const StyledButton = styled(Button)`
  flex: 1;
`;
