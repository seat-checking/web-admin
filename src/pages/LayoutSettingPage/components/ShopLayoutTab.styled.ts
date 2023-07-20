import styled from 'styled-components/macro';
import { Button } from 'components/Button';
import { grayBorderBoxStyle } from 'styles/mixin';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 2.5rem;
`;

export const DescriptionText = styled.p`
  margin-bottom: 4rem;
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

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SQUARE_HEIGHT = 10;

export const Square = styled.div`
  margin-bottom: 1rem;
  width: 10rem;
  height: ${SQUARE_HEIGHT}rem;

  border: 0.2rem solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 0.4rem;

  background-color: ${({ theme }) => theme.palette.grey[50]};
`;

export const RectangleWrap = styled.div`
  height: ${SQUARE_HEIGHT}rem;
  display: flex;
  align-items: center;
`;

export const Rectangle = styled(Square)`
  height: 6rem;
`;

export const WidthSettingBox = styled.div`
  margin-top: 1.6rem;

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

export const SettingLabel = styled.span`
  margin-right: auto;
`;

export const WidthSettingRightWrap = styled.div`
  margin-right: auto;
`;

export const HeightInput = styled.input`
  margin: 0 1.2rem;

  width: 10.4rem;
  border: 0.5px solid rgba(26, 28, 45, 0.3);
  background-color: ${({ theme }) => theme.palette.grey[50]};

  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const IconWrap = styled.div`
  &:hover {
    svg {
      rect {
        fill: ${({ theme }) => theme.palette.primary.orange};
      }
      path {
        stroke: white;
      }
    }
  }
`;

export const StyledButton = styled(Button)`
  margin-top: auto;
`;
