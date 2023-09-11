import styled, { css } from 'styled-components';

interface ReservationTagProps {
  active: boolean;
  children: React.ReactNode;
  onClick?: VoidFunction;
}

/**
 * 예약 상태 개별 탭 컴포넌트
 */
export const StatusTag: React.FC<ReservationTagProps> = ({
  active,
  children,
  onClick,
}) => {
  return (
    <Button type='button' onClick={onClick} $active={active}>
      {children}
    </Button>
  );
};

const Button = styled.button<{ $active: boolean }>`
  padding: 0.8rem 2rem;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 5.6rem;

  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 500;

  &:hover {
    ${({ $active }) =>
      !$active &&
      css`
        background-color: rgba(0, 0, 0, 0.2);
      `}
  }

  ${({ $active }) =>
    $active &&
    css`
      border: 1px solid ${({ theme }) => theme.palette.grey[500]};
      background-color: ${({ theme }) => theme.palette.grey[500]};
      color: white;
    `}
`;
