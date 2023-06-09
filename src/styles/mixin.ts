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
