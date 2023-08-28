import styled, { useTheme } from 'styled-components';
import { useDeleteSpace } from 'common/hooks/mutations/useDeleteSpace';
import { TEMPORARY_SPACE_ID } from 'common/utils/constants';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { useSpaceId } from 'pages/LayoutSettingPage/hooks/useSpaceId';

interface DeleteSpaceModalProps {
  onClose: () => void;
  onDeleteSpace: () => void;
}
/**
 * 스페이스 삭제 모달
 */
export const DeleteSpaceModal: React.FC<DeleteSpaceModalProps> = ({
  onClose,
  onDeleteSpace,
}) => {
  const theme = useTheme();
  const { spaceId } = useSpaceId();

  const { mutate: deleteMutate } = useDeleteSpace();

  const handleCancel = () => {
    onClose();
  };

  const deleteSpace = () => {
    onDeleteSpace();
    onClose();
  };

  const handleDelete = () => {
    if (spaceId === TEMPORARY_SPACE_ID) {
      deleteSpace();
      return;
    }
    deleteMutate(spaceId, { onSuccess: deleteSpace });
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>좌석 설정</Modal.Header>
      <Content>
        <ConfirmText>정말 스페이스를 삭제할까요? 😥</ConfirmText>
        <DescriptionText>
          삭제하면 스페이스 내부 좌석도 모두 사라져요.
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
          onClick={handleDelete}
        >
          스페이스 삭제
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
