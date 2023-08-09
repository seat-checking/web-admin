import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 4rem 0;
  width: 57rem; // TODO (순권님)
  /* width: 53.8rem; */
  margin: auto;
`;

export const ListItem = styled.li`
  & + & {
    margin-top: 2.4rem;
  }
`;

export const ListItemFlex = styled(ListItem)`
  display: flex;
`;

export const LeftWrap = styled.div`
  flex: 1;
`;

export const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  padding-left: 1rem;
`;

export const OpenText = styled.div`
  line-height: normal;
  text-align: right;
  color: ${({ theme }) => theme.palette.black};
  font-size: 1.2rem;
  font-weight: 600;

  .orange {
    color: ${({ theme }) => theme.palette.primary.orange};
  }
`;

export const DayList = styled.ul`
  margin-top: 2.4rem;
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
