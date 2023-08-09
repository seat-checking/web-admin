import styled, { css } from 'styled-components/macro';

const WIDTH_FOLDED = '9.6rem';
const WIDTH_UNFOLDED = '31.5rem';

export const Wrap = styled.div<{ folded: boolean }>`
  position: fixed;
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8rem 0;

  width: ${({ folded }): string => (folded ? WIDTH_FOLDED : WIDTH_UNFOLDED)};
  min-height: 100vh; // 필요
  background-color: #303030;

  .shopLogo {
    width: ${({ folded }): string => (folded ? '4.8rem' : '14rem')};
    height: ${({ folded }): string => (folded ? '4.8rem' : '14rem')};
    object-fit: cover;
    background-color: ${({ theme }): string => theme.palette.primary.orange};
    box-shadow: 0px 0.5rem 0.5rem rgba(44, 44, 44, 0.2);
    border-radius: ${({ folded }): string => (folded ? '0.8rem' : '1.4rem')};
  }

  .shopNameWrap {
    margin-top: ${({ folded }): string => (folded ? '1.2rem' : '1.4rem')};
    display: flex;
    align-items: center;
  }

  .shopName {
    margin-right: 0.8rem;

    font-weight: 600;
    font-size: ${({ folded }): string => (folded ? '1.4rem' : '2.4rem')};
    color: white;
    // 말줄임 표시
    max-width: ${({ folded }): string => (folded ? '7.6rem' : '18rem')};
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .branchName {
    margin-top: 0.8rem;

    color: ${({ theme }): string => theme.palette.grey[300]};
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }

  .hideFold {
    ${({ folded }) =>
      folded &&
      css`
        display: none;
      `}
  }

  .naviationList {
    width: ${({ folded }): string => (folded ? '5.6rem' : '23.5rem')};

    margin-top: ${({ folded }): string => (folded ? '15rem' : '3.2rem')};
  }
`;

export const FoldBtn = styled.button`
  margin-top: auto;
`;

export const Blank = styled.div<{ folded: boolean }>`
  width: ${({ folded }): string => (folded ? WIDTH_FOLDED : WIDTH_UNFOLDED)};
`;
