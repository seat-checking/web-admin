import styled, { css } from 'styled-components/macro';
import type { JoinStatus } from 'pages/JoinPage/utils/types';
import { mediaBpDown } from 'styles/mixin';

export const Wrap = styled.div`
  /* background-color: aliceblue; */
  display: flex;
`;

const LEFT_SIDE_WIDTH = '40%';

export const LeftSide = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.orange};
  width: ${LEFT_SIDE_WIDTH};

  ${mediaBpDown(
    '700px',
    css`
      display: none;
    `,
  )}
`;

export const WhiteTitle = styled.h2`
  /* background-color: aqua; */
  width: ${LEFT_SIDE_WIDTH};
  position: fixed;
  top: 50%;
  left: 0;

  font-weight: 700;
  font-size: 3.4rem;
  line-height: 4.1rem;
  color: white;
  text-align: center;
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

export const ProgressText = styled.span`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;

  margin-left: 0.8rem;

  color: ${({ theme }) => theme.palette.grey[300]};
`;
