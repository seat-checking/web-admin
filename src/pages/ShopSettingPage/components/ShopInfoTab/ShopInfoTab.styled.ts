import styled from 'styled-components';
import { Button } from 'components/Button';

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

export const AddFileRow = styled.div`
  height: 10.9rem;

  display: flex;
  gap: 1.2rem;
`;
export const AddFileBtn = styled(Button)`
  flex: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  color: ${({ theme }) => theme.palette.grey[400]};

  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.4rem;
`;

export const RadioRow = styled.li`
  display: flex;
  align-items: center;
  gap: 4rem;

  padding-top: 0.8rem;
`;

export const LocationBtn = styled(Button)`
  background-color: white;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 1.6rem;
  font-weight: 600;
`;
