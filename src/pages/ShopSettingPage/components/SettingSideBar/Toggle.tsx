import styled from 'styled-components/macro';

interface ToggleProps {
  text?: string | number;
}

/**
 * 컴포넌트
 */
export const Toggle: React.FC<ToggleProps> = ({ text }) => {
  return (
    <Wrap>
      <input role='switch' type='checkbox' />
    </Wrap>
  );
};

const Wrap = styled.div`
  [type='checkbox'] {
    cursor: pointer;
    appearance: none;

    position: relative;
    border: 0.16rem solid ${({ theme }) => theme.palette.grey[300]};
    width: 5.3rem;
    height: 3.2rem;
    border-radius: 3.2rem;
    background-color: ${({ theme }) => theme.palette.grey[300]};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 2.9em;
      height: 2.9em;
      border-radius: 50%;
      /* transform: scale(0.8); */
      background-color: white;
      transition: all 250ms linear;
    }
  }

  [type='checkbox']:checked {
    background-color: ${({ theme }) => theme.palette.primary.orange};
    border-color: ${({ theme }) => theme.palette.primary.orange};

    &::before {
      left: auto;
      right: 0;
      transition: all 250ms linear;
    }
  }
`;
