import styled from 'styled-components/macro';

interface ToggleProps {
  isChecked: boolean;
}

/**
 * 토글
 */
export const Toggle: React.FC<ToggleProps> = ({ isChecked }) => {
  //   const [isChecked, setIsChecked] = useState(false);
  return (
    <Wrap>
      <input role='switch' type='checkbox' />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex; // 여백 없애기 위함
  [type='checkbox'] {
    cursor: pointer;
    appearance: none;

    position: relative;
    border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
    width: 4rem;
    height: 2.4rem;
    border-radius: 2.4rem;
    background-color: ${({ theme }) => theme.palette.grey[300]};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      /* transform: scale(0.9); */
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
