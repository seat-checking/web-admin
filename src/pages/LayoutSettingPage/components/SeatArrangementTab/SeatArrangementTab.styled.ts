import styled, { css } from 'styled-components/macro';
import { Button } from 'components/Button';
import { flexSet, grayBorderBoxStyle } from 'styles/mixin';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%; // 부모에 height: 100 줘야 자식에 flex-grow 적용 가능
  padding: 2.3rem;

  user-select: none;
`;

export const DescriptionText = styled.p`
  margin-bottom: 2.4rem;

  color: ${({ theme }) => theme.palette.grey[300]};
  font-weight: 400;
  font-size: 2rem;
  line-height: normal;

  text-align: center;
`;

export const LabelText = styled.p`
  margin-bottom: 0.8rem;

  font-weight: 400;
  font-size: 2rem;
  color: ${({ theme }) => theme.palette.grey[300]};
`;

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 4.8rem;
`;

export const TableBox = styled.div`
  ${grayBorderBoxStyle}
  ${flexSet()}
  width: 9.6rem;
  height: 9.6rem;
  border-radius: 0.5rem;
`;

export const DoorChairBox = styled.div`
  ${grayBorderBoxStyle}
  ${flexSet()}
  width: 100%;
  height: 9.6rem;
  border-radius: 0.5rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 2rem;

  margin-top: auto;
`;

export const StyledButton = styled(Button)<{ $isChanged?: boolean }>`
  flex: 1;

  ${({ $isChanged }) => {
    return (
      $isChanged &&
      css`
        /* background-color: red; */
      `
    );
  }}
`;
