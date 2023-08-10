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
