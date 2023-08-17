import styled from 'styled-components';
import { ReactComponent as AlertCicleIcon } from 'assets/icons/alert-circle.svg';

interface HelperTextProps {
  children: React.ReactNode;
}

/**
 * 도움말 문구 컴포넌트 (info 아이콘 + 텍스트), 일시 정지 설명 띄움
 */
export const HelperText: React.FC<HelperTextProps> = ({ children }) => {
  return (
    <Wrap>
      <IconWrap>
        <AlertCicleIcon width='1.2rem' height='1.2rem' />
      </IconWrap>
      <Text>{children}</Text>
      <DescriptionModal />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  svg {
    path {
      fill: #727582;
    }
  }
`;

const Text = styled.span`
  flex: 1;

  margin-left: 0.4rem;
  color: ${({ theme }) => theme.palette.grey[400]};

  font-size: 1.2rem;
  letter-spacing: -0.897px;
  font-weight: 400;
  line-height: normal;
`;

const DescriptionModal = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[400]};
`;
