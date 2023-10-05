import styled, { css, keyframes } from 'styled-components';
import type React from 'react';

type ThemeType = 'dark' | 'light';
interface LoadingSpinnerProps {
  height?: string;
  spinnerSize?: string;
  spinnerThickness?: string;
  theme?: ThemeType;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  height = '100%',
  spinnerSize = '5rem',
  spinnerThickness = '0.5rem',
  theme = 'dark',
}) => {
  return (
    <SpinnerContainer $height={height}>
      <CircularLoader
        $theme={theme}
        $spinnerSize={spinnerSize}
        $spinnerThickness={spinnerThickness}
      />
    </SpinnerContainer>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div<{ $height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height};
`;

const CircularLoader = styled.div<{
  $spinnerSize: string;
  $spinnerThickness: string;
  $theme: ThemeType;
}>`
  width: ${({ $spinnerSize }) => $spinnerSize};
  height: ${({ $spinnerSize }) => $spinnerSize};
  border-radius: 50%;

  border: ${({ $spinnerThickness }) => $spinnerThickness} solid
    rgba(0, 0, 0, 0.1);
  border-top: ${({ $spinnerThickness }) => $spinnerThickness} solid orange;

  ${({ $theme }) =>
    $theme === 'light' &&
    css`
      border-color: rgba(255, 255, 255, 0.3);
      border-top-color: white;
    `}

  animation: ${spin} 1s linear infinite;

  margin: 2rem;
`;
