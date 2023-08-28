import styled, { useTheme } from 'styled-components';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

interface ExitConfirmModalProps {
  onComplete?: () => void;
  onClose?: () => void;
}
/**
 * 저장하지 않았을 때 뜨는 확인 모달
 */
export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({
  onComplete,
  onClose,
}) => {
  const theme = useTheme();
  const { setChange } = useChange();

  const handleClose = () => {
    onClose?.();
  };

  const handleCancel = () => {
    setChange(false);
    onComplete?.();

    /**
     * 스페이스 추가 중(id -1)이었으면 스페이스 목록에서 추가된 스페이스 삭제시켜야함
     *
     * 스페이스 명을 변경했으면 스페이스 목록에서 변경된 스페이스명 다시 복구시켜야함
     *
     * -> 스페이스 목록 불러오는 쿼리만 다시 호출하면 될듯..^^... 그게 싫으면 initialData도 같이 들고있어야함..
     * queryData를 다시 상태 변수에 저장시켜도 되겠다!!
     */
    handleClose();
  };

  const handleSave = () => {
    setChange(false);
    onComplete?.();
    // TODO 저장 처리
    handleClose();
  };

  return (
    <Modal onClose={handleClose}>
      <Modal.Header>좌석 설정</Modal.Header>
      <Content>
        <ConfirmText>
          좌석을 저장하지 않고 <br />
          현재 스페이스를 나가시나요? 😥
        </ConfirmText>
        <DescriptionText>
          저장하지 않으면 좌석이 모두 초기화 돼요!
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
          스페이스 나가기
        </Button>
        <Button
          backgroundColor={theme.palette.grey[500]}
          borderRadius='0.4rem'
          fontSize='1.4rem'
          height='4.5rem'
          onClick={handleSave}
        >
          저장하기
        </Button>
      </Footer>
    </Modal>
  );
};

const ConfirmText = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.3rem;
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
