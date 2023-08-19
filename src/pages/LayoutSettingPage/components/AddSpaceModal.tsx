import { useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import type { ReservationUnit } from 'pages/LayoutSettingPage/utils/types';
import { Button } from 'components/Button';
import InputCheckBox from 'components/InputCheckBox';
import { Modal } from 'components/Modal';
import { useSpace } from 'pages/LayoutSettingPage/hooks/useSpace';
import { useLayoutActions } from 'pages/LayoutSettingPage/stores/layoutStore';
import {
  useReservationUnit,
  useSpaceInfoActions,
  useSpaceName,
} from 'pages/LayoutSettingPage/stores/spaceInfoStore';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}
/**
 * 스페이스 추가 모달
 */
export const AddSpaceModal: React.FC<AddModalProps> = ({ isOpen, onClose }) => {
  const { addSpace, deleteSpace, selected, setSelectedSpace, setSpaces } =
    useSpace();

  const spaceName = useSpaceName();
  const reservationUnit = useReservationUnit();
  const ref = useRef<HTMLInputElement | null>(null);
  const { setSpaceName, setReservationUnit } = useSpaceInfoActions();
  const { clear: clearLayout } = useLayoutActions();

  const theme = useTheme();
  const [input, setInput] = useState('');
  const [reservationUnits, setReservationUnits] = useState<ReservationUnit>({
    seat: true,
    space: false,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleChangeUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unit = e.currentTarget.name;
    setReservationUnits({
      ...reservationUnits,
      [unit]: e.currentTarget.checked,
    });
  };

  const getReservationHelperText = () => {
    if (reservationUnits.seat && !reservationUnits.space)
      return '고객이 좌석만 예약할 수 있어요';
    if (!reservationUnits.seat && reservationUnits.space)
      return '고객이 스페이스만 예약할 수 있어요';
    if (reservationUnits.seat && reservationUnits.space)
      return '고객이 좌석과 스페이스 모두 예약할 수 있어요';
    return '예약 단위를 선택하셔야 돼요';
  };

  const handleAddSpace = () => {
    setSpaceName(input);
    setReservationUnit(reservationUnits);
    addSpace(input);
    clearLayout();
    onClose();
  };
  /* eslint-disable-next-line */
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOusideClick={false}>
      <Modal.Header>스페이스 생성</Modal.Header>
      <Content>
        <SpaceNameLabel>사용할 스페이스의 이름을 적어주세요</SpaceNameLabel>
        <SpaceNameInput
          type='text'
          value={input}
          onChange={handleInput}
          placeholder='ex) 1층 Blue 룸'
          ref={ref}
        />
        <UnitLabel>예약 단위 설정</UnitLabel>
        <UnitInputsWrap>
          <InputLabel>
            <InputCheckBox
              name='seat'
              checked={reservationUnits.seat}
              onChange={handleChangeUnit}
            />
            <InputLabelText>좌석</InputLabelText>
          </InputLabel>
          <InputLabel>
            <InputCheckBox
              name='space'
              checked={reservationUnits.space}
              onChange={handleChangeUnit}
            />
            <InputLabelText>스페이스</InputLabelText>
          </InputLabel>
        </UnitInputsWrap>
        <UnitHelper>{getReservationHelperText()}</UnitHelper>
        <Button
          height='4.5rem'
          backgroundColor={theme.palette.grey[500]}
          borderRadius='0.4rem'
          fontSize='1.4rem'
          isDisabled={
            input.length === 0 ||
            (!reservationUnits.seat && !reservationUnits.space)
          }
          onClick={handleAddSpace}
        >
          스페이스 생성
        </Button>
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  padding: 1.6rem;
`;
const SpaceNameLabel = styled.div`
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.palette.black};
  font-size: 1.8rem;
  font-weight: 600;
`;

const SpaceNameInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.6rem;

  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};

  font-size: 1.6rem;
  font-weight: 600;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey[300]};
  }
`;

const UnitLabel = styled.div`
  margin-top: 2.4rem;

  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.grey[300]};
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  height: fit-content;

  cursor: pointer;
`;

const InputLabelText = styled.span`
  margin-left: 0.8rem;

  color: ${({ theme }) => theme.palette.black};
  font-size: 1.4rem;
  font-weight: 600;
`;

const UnitInputsWrap = styled.div`
  display: flex;
  gap: 4rem;

  margin-top: 1.2rem;
  margin-bottom: 2.4rem;
`;

const UnitHelper = styled.div`
  margin-bottom: 2.4rem;
  text-align: center;

  color: ${({ theme }) => theme.palette.primary.orange};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2.3rem;
`;
