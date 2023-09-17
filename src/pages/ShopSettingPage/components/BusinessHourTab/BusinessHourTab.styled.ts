import styled from 'styled-components';
import { ErrorMessage } from 'components/ErrorMessage';

export const Wrap = styled.div`
  padding: 4rem 0;
  width: 59rem;
  margin: auto;
`;

export const ItemWrap = styled.div`
  & + & {
    margin-top: 2.4rem;
  }
`;

export const ItemWrapFlex = styled(ItemWrap)`
  position: relative;
  display: flex;
  align-items: center;
`;

export const DayItem = styled.li`
  margin-bottom: 2.5rem;
  & + & {
    margin-top: 2.4em;
  }
`;

export const DayText = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.palette.black};

  margin-bottom: 0.8rem;
`;
export const Slash = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.2rem;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.palette.grey[400]};
`;

export const MaxTimeWrap = styled.div`
  display: flex;
`;

export const SaveBtnWrap = styled.div`
  margin: 6.8rem 0;
`;

export const ToggleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: -7rem;
  top: -0.6rem;
  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 400;
`;

export const GappedErrorMessage = styled(ErrorMessage)`
  margin-top: 1.4rem;
`;
