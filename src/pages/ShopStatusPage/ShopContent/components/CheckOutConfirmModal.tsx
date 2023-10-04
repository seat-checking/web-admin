import styled, { useTheme } from 'styled-components';
import { useForceCheckout } from 'common/hooks/mutations/useForceCheckout';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

interface CheckOutConfirmModalProps {
  onClose: () => void;
  selectedChairId: number | null;
  selectedManageId: number | null;
}
/**
 * 스페이스 삭제 모달
 */
export const CheckOutConfirmModal: React.FC<CheckOutConfirmModalProps> = ({
  onClose,
  selectedChairId,
  selectedManageId,
}) => {
  const theme = useTheme();
  const { mutate: forceCheckoutMutate } = useForceCheckout();

  if (selectedChairId == null) {
    return null;
  }

  const handleCancel = () => {
    onClose();
  };

  const handleCheckout = () => {
    forceCheckoutMutate(selectedChairId);
    onClose();
  };

  return (
    <Modal onClose={onClose} closeOnOusideClick>
      <Modal.Header>좌석 설정</Modal.Header>
      <Content>
        <ConfirmText>
          해당 좌석 ({selectedManageId}번) 사용 종료할까요? 😥
        </ConfirmText>
        <DescriptionText>
          해당 좌석 ({selectedManageId}번) 사용 종료할까요?
        </DescriptionText>
      </Content>
      <Footer>
        <Button
          backgroundColor={theme.palette.grey[100]}
          color={theme.palette.grey[500]}
          borderRadius='0.4rem'
          fontSize='1.4rem'
          height='4.5rem'
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          backgroundColor={theme.palette.grey[500]}
          borderRadius='0.4rem'
          fontSize='1.4rem'
          height='4.5rem'
          onClick={handleCheckout}
        >
          사용 종료
        </Button>
      </Footer>
    </Modal>
  );
};

const ConfirmText = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
`;

const DescriptionText = styled.div`
  margin-top: 0.6rem;

  color: ${({ theme }) => theme.palette.grey[300]};
  font-weight: 400;
`;
const Content = styled.div`
  text-align: center;
  padding: 1.6rem;
  padding-bottom: 2.4rem;
`;

const Footer = styled.footer`
  display: flex;
  gap: 2rem;

  padding: 1.6rem;

  & > * {
    flex: 1;
  }
`;
