import styled, { keyframes } from 'styled-components';
import type React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <CircularLoader />
    </SpinnerContainer>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SPINNER_THICKNESS_REM = 0.5;

const CircularLoader = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;

  border: ${SPINNER_THICKNESS_REM}rem solid rgba(0, 0, 0, 0.1);
  border-top: ${SPINNER_THICKNESS_REM}rem solid orange;

  animation: ${spin} 1s linear infinite;
`;
