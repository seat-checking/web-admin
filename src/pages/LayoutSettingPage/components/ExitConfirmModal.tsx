import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

/**
 * 저장하지 않았을 때 뜨는 확인 모달
 */
export const ExitConfirmModal: React.FC = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
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
