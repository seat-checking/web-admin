import { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { CHAIR_POPOVER_BODY_WIDTH_REM } from 'pages/LayoutSettingPage/utils/constants';
import { flexSet } from 'styles/mixin';

interface ChairBodyProps {
  defaultNumber?: number;
  manageId: string;
  setManageId: any;
}

/**
 * 의자 클릭했을 때의 팝오버 바디 영역
 */
export const ChairBody: React.FC<ChairBodyProps> = ({
  manageId,
  setManageId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value === '') {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Wrap>
      <Label>좌석번호</Label>
      <Input
        placeholder=''
        type='text'
        pattern='\d*'
        maxLength={3}
        value={manageId}
        onChange={(e) => {
          setManageId(e.currentTarget.value);
        }}
        ref={inputRef}
        onBlur={handleBlur}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;

  width: ${CHAIR_POPOVER_BODY_WIDTH_REM}rem;
`;

const Label = styled.span`
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: normal;
`;

const Input = styled.input`
  width: 5.9rem;
  padding: 0.4rem 0;

  background-color: ${({ theme }) => theme.palette.grey[50]};
  text-align: center;

  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
