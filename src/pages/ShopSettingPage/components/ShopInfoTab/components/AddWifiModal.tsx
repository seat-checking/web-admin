import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

interface AddWifiModalProps {
  onClose: () => void;
}
/**
 * Wi-Fi 등록하기 모달
 */
export const AddWifiModal: React.FC<AddWifiModalProps> = ({ onClose }) => {
  const theme = useTheme();
  const [input, setInput] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  return (
    <Modal isOpen onClose={onClose} closeOnOusideClick={false}>
      <Modal.Header>Wi-Fi 등록</Modal.Header>
      <Content>
        <ConfirmText>등록할 Wi-Fi의 이름을 적어주세요.</ConfirmText>
        <WifiNameInput
          type='text'
          value={input}
          onChange={handleInput}
          placeholder='ex) 1층 와이파이'
        />
      </Content>
      <Footer>
        <Button
          backgroundColor={theme.palette.grey[100]}
          color={theme.palette.grey[500]}
          borderRadius='0.4rem'
          fontSize='1.4rem'
          height='4.5rem'
          onClick={onClose}
        >
          취소
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
  margin-bottom: 1.6rem;

  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.3rem;
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

const WifiNameInput = styled.input`
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
