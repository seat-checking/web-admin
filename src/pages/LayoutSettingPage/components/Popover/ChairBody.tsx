import styled from 'styled-components/macro';
import { flexSet } from 'styles/mixin';

interface ChairBodyProps {
  defaultNumber?: number;
}

/**
 * 의자 클릭했을 때의 팝오버 바디 영역
 */
export const ChairBody: React.FC<ChairBodyProps> = ({ defaultNumber }) => {
  return (
    <Wrap>
      <Label>좌석번호</Label>
      <Input placeholder='' value={defaultNumber} />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;

  width: 13.6rem;
`;

const Label = styled.span`
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: normal;
`;

const Input = styled.input`
  width: 5.9rem;
  padding: 0.4rem 0;

  background-color: ${({ theme }) => theme.palette.grey[50]};
  text-align: center;

  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
`;
