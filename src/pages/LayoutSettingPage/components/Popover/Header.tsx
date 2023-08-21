import styled from 'styled-components/macro';
import { flexSet } from 'styles/mixin';

interface HeaderProps {
  number?: number;
}

/**
 * 컴포넌트
 */
export const Header: React.FC<HeaderProps> = ({ number }) => {
  return (
    <Wrap>
      <ManageId>{number}번</ManageId>
      <DeleteBtn type='button'>삭제</DeleteBtn>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 0.8rem;
`;

const ManageId = styled.span`
  color: ${({ theme }) => theme.palette.primary.orange};
  font-size: 1.2rem;
  font-weight: 500;
  line-height: normal;
`;

const DeleteBtn = styled.button`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.2rem;
  font-weight: 500;
  line-height: normal;
`;
