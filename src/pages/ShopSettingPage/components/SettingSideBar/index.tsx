import styled, { useTheme } from 'styled-components/macro';
import { ReactComponent as PlusCircleIcon } from 'assets/icons/plus-circle.svg';
import { SideBar } from 'components/SideBar';
import { ShopItem } from 'pages/ShopSettingPage/components/SettingSideBar/ShopItem';

/**
 * 컴포넌트
 */
export const SettingSideBar: React.FC = () => {
  const theme = useTheme();
  return (
    <StyledSideBar>
      <SideHeaderWrap>
        <Title>전체 가게 관리</Title>
        <button type='button'>
          <PlusCircleIcon stroke={theme.palette.black.main} />
        </button>
      </SideHeaderWrap>

      <ul>
        <ShopItem name='hspace?' />
        <ShopItem name='hspace?' />
      </ul>
    </StyledSideBar>
  );
};

export const StyledSideBar = styled(SideBar)`
  padding: 8rem 4rem;
  /* min-height: 100vh; */
  /* overflow: auto; */
  /* background-color: aqua; */
`;

export const SideHeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 2.4rem;
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 500;

  color: ${({ theme }) => theme.palette.grey[500]};
`;
