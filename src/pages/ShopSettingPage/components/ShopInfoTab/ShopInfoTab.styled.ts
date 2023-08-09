import styled from 'styled-components';
import upload from 'assets/icons/upload.svg';
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  color: ${({ theme }) => theme.palette.grey[300]};

  font-size: 1.4rem;
  font-weight: 600;
  line-height: normal;
`;

export const UploadIconBox = styled.div`
  margin-bottom: 0.8rem;

  width: 2.4rem;
  height: 2.4rem;
  background-image: url(${upload});
  background-size: contain;
  background-repeat: no-repeat;
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
