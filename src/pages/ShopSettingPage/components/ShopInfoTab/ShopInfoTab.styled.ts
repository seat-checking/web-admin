import styled from 'styled-components';

export const ContentWrap = styled.ul`
  width: 100%;

  padding-bottom: 10rem;
`;

export const GrayBackground = styled.div`
  width: 100%;
  padding: 4rem 0;
  margin-bottom: 4rem;
  background-color: ${({ theme }) => theme.palette.grey[50]};
`;
export const ListItem = styled.li`
  width: 60rem; // TODO (순권님)
  /* width: 53.9rem; */
  margin: auto;
  & + & {
    margin-top: 6.8rem;
  }
`;

export const ListItemFlex = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`;

export const CurrentWifiBtn = styled.button`
  width: 100%;
  height: 4.2rem;
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.palette.grey[500]};

  color: white;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    filter: brightness(95%);
  }
`;

export const LeftWrap = styled.div``;

export const RightWrap = styled.div``;

export const OpenText = styled.div`
  line-height: normal;
  text-align: right;
  color: ${({ theme }) => theme.palette.black};
  font-size: 1.2rem;
  font-weight: 600;
`;

export const WifiLabelWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;
export const WifiHelperWrap = styled.div`
  margin-left: 0.6rem;
`;

export const FileInput = styled.input``;

export const RadioRow = styled.li`
  display: flex;
  align-items: center;
  gap: 4rem;

  padding-top: 0.8rem;
`;
