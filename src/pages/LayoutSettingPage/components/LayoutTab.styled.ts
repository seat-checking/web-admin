import styled from 'styled-components/macro';
import { grayBorderBoxStyle } from 'styles/mixin';

export const Wrap = styled.div`
  padding: 2.5rem;
`;
export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.palette.grey[300]};
  font-weight: 400;
  font-size: 2rem;
  line-height: normal;

  text-align: center;
`;

export const LayoutBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  ${grayBorderBoxStyle}
  width: 100%;
  height: 19rem;
  border-radius: 0.8rem;
  background-color: white;
`;

export const Square = styled.div`
  width: 10rem;
  height: 10rem;

  border: 0.2rem solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 0.4rem;

  background-color: ${({ theme }) => theme.palette.grey[50]};
`;
export const Rectangle = styled(Square)`
  height: 6rem;
`;

export const Label = styled.label`
  background-color: aqua;
`;

export const WidthSettingBox = styled.div`
  ${grayBorderBoxStyle}
  display: flex;
  align-items: center;

  padding: 1.5rem 1.6rem;
  width: 100%;
  height: 6.2rem;

  background-color: white;

  font-weight: 500;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.palette.grey[500]};
`;
