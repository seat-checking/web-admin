import styled from 'styled-components/macro';
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
  width: 53.9rem;
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

export const RadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8.7rem;

  padding-top: 0.8rem;
`;
