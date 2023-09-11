import styled from 'styled-components/macro';
import { SideBar } from 'components/SideBar';

export const Wrap = styled.div`
  flex: 1; // GNB 제외한 영역 꽉 채우기
  display: flex;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

export const StyledSideBar = styled(SideBar)`
  padding-top: 6rem;
  padding-bottom: 8rem;
`;
