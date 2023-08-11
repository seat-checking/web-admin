import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 4rem 0;
  width: 53.8rem;
  margin: auto;
`;

export const ItemWrap = styled.div`
  & + & {
    margin-top: 2.4rem;
  }
`;

export const ItemWrapFlex = styled(ItemWrap)`
  display: flex;
`;

export const DayItem = styled.li`
  & + & {
    margin-top: 2.4em;
  }
`;

export const DayText = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.palette.black};

  margin-bottom: 0.8rem;
`;
export const Slash = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.2rem;

  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.palette.grey[400]};
`;

export const MaxTimeWrap = styled.div`
  display: flex;
`;

export const SaveBtnWrap = styled.div`
  margin: 6.8rem 0;
`;
