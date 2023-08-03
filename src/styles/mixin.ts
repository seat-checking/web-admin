import { css } from 'styled-components';
import type { FlattenSimpleInterpolation } from 'styled-components';

export const flexSet = (
  justify = 'center',
  align = 'center',
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
