import styled from 'styled-components';
import { flexSet } from 'styles/mixin';

/**
 * 가게 통계 페이지
 */
export const ShopStatisticsPage: React.FC = () => {
  return (
    <Wrap>
      <Text>준비 중입니다.</Text>
    </Wrap>
  );
};

const Wrap = styled.div`
  flex: 1;
  height: 100vh;
  background-color: black;
  opacity: 0.8;
  ${flexSet()}
`;

const Text = styled.span`
  color: white;
  font-size: 4.8rem;
  font-weight: 500;
`;
