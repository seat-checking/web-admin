import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Li = styled.li`
  & + & {
    margin-top: 2.4rem;
  }
`;

export const NavigationLink = styled(NavLink)<{ $folded: boolean }>`
  display: flex;
  padding: 1.6rem;

  width: 100%;
  height: 5.6rem;
  border-radius: 0.8rem;

  color: white;
  background-color: transparent;

  font-weight: 500;
  font-size: 2rem;
  line-height: 2.4rem;
  &.active {
    color: #303030;
    background-color: white;
  }

  .hideWrap {
    flex: 1;
    display: flex;
    align-items: center;

    .label {
      margin-left: 0.8rem;
      flex: 1;
    }

    ${({ $folded }) =>
      $folded &&
      css`
        display: none;
      `}
  }
`;
