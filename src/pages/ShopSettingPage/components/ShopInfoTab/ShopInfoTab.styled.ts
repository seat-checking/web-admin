import styled from 'styled-components';

export const Wrap = styled.div`
  padding-top: 4rem;
  width: 100%;
  /* background-color: red; */
`;

export const ContentWrap = styled.ul`
  width: 53.9rem;
  margin: auto;
  /* background-color: yellow; */
`;

export const ListItem = styled.li`
  & + & {
    margin-top: 6.8rem;
  }
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

export const RadioRow = styled.li`
  display: flex;
  align-items: center;
  gap: 4rem;

  padding-top: 0.8rem;
`;
