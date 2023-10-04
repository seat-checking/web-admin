import { useQueryClient } from '@tanstack/react-query';
import styled, { useTheme } from 'styled-components';
import { useSelectedShop } from 'common/stores/authStore';
import { queryKeys } from 'common/utils/constants';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { useSaveLayout } from 'pages/LayoutSettingPage/hooks/useSaveLayout';
import { useChange } from 'pages/LayoutSettingPage/stores/changeStore';

interface ExitConfirmModalProps {
  onComplete?: () => void;
  onClose: () => void;
  clearSpaces: () => void;
}
/**
 * 저장하지 않았을 때 뜨는 확인 모달
 */
export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({
  onComplete,
  onClose,
  clearSpaces,
}) => {
  const theme = useTheme();
  const { setChange } = useChange();
  const saveLayout = useSaveLayout();

  const queryClient = useQueryClient();
  const { storeId: shopId } = useSelectedShop();

  const handleCancel = () => {
    setChange(false);
    clearSpaces();
    onComplete?.();

    onClose();
  };

  const handleSave = () => {
    setChange(false);
    queryClient.invalidateQueries([queryKeys.GET_SPACES, shopId]);
    onComplete?.();

    saveLayout();

    onClose();
  };

  return (
    <Modal onClose={onClose}>
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
