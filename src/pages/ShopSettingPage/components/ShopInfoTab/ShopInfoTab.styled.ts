import styled from 'styled-components/macro';
import upload from 'assets/icons/upload.svg';
import { Button } from 'components/Button';
import { ErrorMessage } from 'components/ErrorMessage';
import { StyledInput } from 'components/Input.styled';

export const ContentWrap = styled.ul`
  width: 100%;

  padding-top: 4rem;
  padding-bottom: 10rem;
`;

export const GappedErrorMessage = styled(ErrorMessage)`
  margin-top: 0.8rem;
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

export const TextArea = styled(StyledInput).attrs({ as: 'textarea' })`
  padding: 1rem 1.6rem;

  width: 100%;
  height: 8rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 0.8rem;

  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;
