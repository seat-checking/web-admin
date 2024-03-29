import styled from 'styled-components/macro';

interface LabelProps {
  label: string;
  required?: boolean; // false면 * 표시 숨김
  children?: React.ReactNode;
  marginBottom?: string;
}

/**
 * 인풋 위에 달려있는 라벨 문구
 */
export const Label: React.FC<LabelProps> = ({
  label,
  required = true,
  children,
  marginBottom = '0.8rem',
}) => {
  return (
    <StyledLabel>
      <LabelText $marginBottom={marginBottom}>
        {label}
        {required && <RequiredAsterisk>*</RequiredAsterisk>}
      </LabelText>
      {children}
    </StyledLabel>
  );
};

const StyledLabel = styled.label``;

const LabelText = styled.p<{ $marginBottom: string }>`
  margin-bottom: ${({ $marginBottom }) => $marginBottom};

  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: black;
  opacity: 0.8;
`;

const RequiredAsterisk = styled.span`
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 2rem;
  color: #da1414;
  vertical-align: top;
`;
