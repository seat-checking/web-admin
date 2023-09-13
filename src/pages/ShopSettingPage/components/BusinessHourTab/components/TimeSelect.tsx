import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import styled, { useTheme } from 'styled-components';
import type { Dayjs } from 'dayjs';
import { ReactComponent as ChevronDown } from 'assets/icons/chevron-down.svg';

interface TimeSelectProps {
  defaultValue?: string | null;
  onChange?: (event: string) => void;
  onBlur?: (event: string) => void;
  selected?: string; //
  disabled?: boolean;
}

/**
 * 시간 선택 컴포넌트
 */
export const TimeSelect: React.FC<TimeSelectProps> = ({
  defaultValue,
  onChange: propOnChange,
  onBlur: propOnBlur,
  selected,
  disabled,
}) => {
  const theme = useTheme();
  const internalOnChange = (time: Dayjs | null, timeString: string) => {
    if (propOnChange) {
      propOnChange(timeString);
    }
  };

  return (
    <StyledTimePicker
      use12Hours={false}
      format='HH:mm'
      onChange={internalOnChange}
      defaultValue={defaultValue ? dayjs(defaultValue, 'HH:mm') : undefined}
      value={selected ? dayjs(selected, 'HH:mm') : undefined}
      allowClear={false}
      minuteStep={30}
      showNow={false}
      disabled={disabled}
      suffixIcon={<ChevronDown stroke={theme.palette.grey[300]} />}
      size='small'
      placeholder='지정되지 않음'
      style={{
        flex: 1,
        height: '42px',
        fontSize: '1.8rem',
        padding: '1.2rem',
      }}
    />
  );
};

const StyledTimePicker = styled(TimePicker)`
  // 다른 스타일들

  .ant-picker-suffix {
    position: relative;
  }

  .ant-picker-clear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.5rem;
  }
`;
