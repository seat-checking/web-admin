import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

export const Wrap = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 3rem 2.4rem;

  width: 100%;
  height: 11.5rem;

  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[200]};
  background-color: white;

  & + & {
    margin-top: 1.6rem;
  }

  &.active {
    background: rgba(255, 141, 78, 0.1);
    border-color: ${({ theme }) => theme.palette.primary.orange};

    svg {
      path {
        stroke: ${({ theme }) => theme.palette.primary.orange};
      }
    }
  }
`;

export const Name = styled.p`
  font-size: 2.4rem;
  line-height: 2.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const OpenStatus = styled.div`
  display: flex;
  align-items: center;
`;

export const Circle = styled.div<{ isOperating: boolean }>`
  margin-right: 0.7rem;

  width: 0.8rem;
  height: 0.8rem;

  background-color: ${({ isOperating, theme }) =>
    isOperating ? theme.palette.primary.orange : theme.palette.grey[300]};
  border-radius: 50%;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: normal;
`;

export const LeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
`;
