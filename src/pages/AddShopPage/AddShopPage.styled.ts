import styled, { css } from 'styled-components/macro';
import type { JoinStatus } from 'pages/JoinPage/utils/types';
import { flexSet, mediaBpDown } from 'styles/mixin';

export const Wrap = styled.div`
  /* background-color: aliceblue; */
  display: flex;
`;

const LEFT_SIDE_WIDTH = '40%';

export const LeftSide = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.orange};
  width: ${LEFT_SIDE_WIDTH};
  min-height: 100vh;

  ${mediaBpDown(
    '700px',
    css`
      display: none;
    `,
  )}
`;

export const LogoWrap = styled.div`
  width: ${LEFT_SIDE_WIDTH};
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  ${flexSet()}
  flex-direction: column;
  gap: 2em;
`;

export const RightSide = styled.div`
  /* background-color: yellow; */
  flex: 1;
  height: 100%;
`;

export const RightContentWrap = styled.div`
  /* background-color: pink; */
  margin: auto;
  padding-top: 9.8rem;
  width: 53.9rem;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 3.4rem;
  line-height: 4.1rem;
  color: ${({ theme }) => theme.palette.grey[500]};

  margin-bottom: 1.6rem;
`;
export const SubTitle = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: normal;
  color: ${({ theme }) => theme.palette.grey[300]};

  margin-bottom: 1.6rem;
`;

export const ProgressWrap = styled.div`
  /* background-color: aqua; */
  margin-bottom: 4rem;

  display: flex;
  align-items: center;
  width: 100%;
`;

export const ProgressBackground = styled.div`
  flex: 1;
  height: 0.4rem;
  background-color: ${({ theme }) => theme.palette.grey[50]};
`;

export const ProgressBar = styled.div<{ status: JoinStatus }>`
  width: ${({ status }) => (status === 'FIRST' ? '50%' : '100%')};
  height: 100%;
  background-color: ${({ theme }) => theme.palette.primary.orange};
`;
