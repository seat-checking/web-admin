import { css } from 'styled-components';
import type { FlattenSimpleInterpolation } from 'styled-components';

type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

export const flexSet = (
  justify: JustifyContent = 'center',
  align: AlignItems = 'center',
): FlattenSimpleInterpolation => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
`;

export const mediaBpDown = (
  maxWidth: string,
  children: FlattenSimpleInterpolation,
) => css`
  @media screen and (max-width: ${maxWidth}) {
    ${children}
  }
`;

export const grayBorderBoxStyle = css`
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[100]};
  background-color: white;
  border-radius: 0.7rem;
`;

// 말줄임 표시
export const ellipsisText = (lineCount: number) => css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${lineCount};
  -webkit-box-orient: vertical;
`;

// 버튼에 마우스 오버 시 어두운 배경색 나오게 함
export const darkerOnHover = (sizeInRem: number) => css`
  position: relative;
  :hover::after {
    display: inline-block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${sizeInRem}rem;
    height: ${sizeInRem}rem;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20%;
  }
`;
