import styled from 'styled-components';

export const ListWrapper = styled.div`
  width: 57.1rem;
  margin: 0 auto;
  margin-top: 0.4rem;
  margin-bottom: 1.6rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[200]};
  background: #fff;
`;

export const ListContent = styled.div`
  width: 53.9rem;
  margin: 0 auto;
`;

export const InputWrapper = styled.div``;

export const Button = styled.button`
  width: 26.5rem;
  height: 4.4rem;
`;
export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 4rem;
  margin-bottom: 2.4rem;
`;

export const TitleText = styled.div`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 600;
  width: 118px;
`;

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  pointer-events: none;
`;

export const LabelWrapper = styled.div`
  width: 57.1rem;
  margin: 0 auto;
  padding-top: 4rem;
  margin-bottom: 10rem;
`;
