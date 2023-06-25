import styled from 'styled-components/macro';

export const Wrap = styled.div``;

export const Label = styled.label``;

export const LabelText = styled.p`
  margin-bottom: 0.8rem;

  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: black;
  opacity: 0.8;
`;

export const RequiredAsterisk = styled.span`
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 2rem;
  color: #da1414;
  vertical-align: top;
`;

export const StyledInput = styled.input`
  padding: 0 1.6rem;

  width: 100%;
  height: 4.8rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 0.8rem;

  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;
