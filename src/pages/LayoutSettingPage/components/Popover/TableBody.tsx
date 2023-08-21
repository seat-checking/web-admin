import styled from 'styled-components/macro';
import { CircledArrowButton } from 'components/CircledArrowButton';
import { flexSet } from 'styles/mixin';

interface TableBodyProps {
  width?: number;
  height?: number;
}

/**
 * 컴포넌트
 */
export const TableBody: React.FC<TableBodyProps> = ({ width, height }) => {
  return (
    <Wrap>
      <Row>
        <Label>가로 길이</Label>
        <CircledArrowButton direction='LEFT' />
        <Input placeholder='' value={width} />
        <CircledArrowButton direction='RIGHT' />
      </Row>
      <Row>
        <Label>세로 길이</Label>
        <CircledArrowButton direction='LEFT' />
        <Input placeholder='' value={height} />
        <CircledArrowButton direction='RIGHT' />
      </Row>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 18rem;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 1.2rem;

  & + & {
    margin-top: 1.2rem;
  }
`;

const Label = styled.span`
  color: white;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
`;

const Input = styled.input`
  width: 4rem;
  padding: 0.4rem 0;

  background-color: ${({ theme }) => theme.palette.grey[50]};
  text-align: center;

  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
`;
