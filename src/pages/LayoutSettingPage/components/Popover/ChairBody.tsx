import { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { useLayoutActions } from 'pages/LayoutSettingPage/stores/layoutStore';
import { useSelectItem } from 'pages/LayoutSettingPage/stores/selectItemStore';
import { CHAIR_POPOVER_BODY_WIDTH_REM } from 'pages/LayoutSettingPage/utils/constants';

interface ChairBodyProps {
  defaultNumber?: number;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
}

/**
 * 의자 클릭했을 때의 팝오버 바디 영역
 */
export const ChairBody: React.FC<ChairBodyProps> = ({
  input,
  setInput,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setManageId } = useLayoutActions();
  const { selectedId } = useSelectItem();

  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value === '') {
      inputRef.current.focus();
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && input !== '' && selectedId) {
      setManageId(selectedId, Number(input));
      onClose?.();
    }
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget;
    if (inputElement.value.length <= inputElement.maxLength) {
      return;
    }

    event.currentTarget.value = inputElement.value.slice(
      0,
      inputElement.maxLength,
    );
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
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
        type='number'
        value={input}
        maxLength={3}
        onChange={handleChangeInput}
        onKeyUp={handleEnter}
        onInput={handleInput}
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
