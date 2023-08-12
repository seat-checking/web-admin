import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import styled, { useTheme } from 'styled-components';
import type { Dayjs } from 'dayjs';
import { ReactComponent as ChevronDown } from 'assets/icons/chevron-down.svg';

interface TimeSelectProps {
  defaultValue?: string; // '23:30' 형태
}

/**
 * 시간 선택 컴포넌트
 */
export const TimeSelect: React.FC<TimeSelectProps> = ({ defaultValue }) => {
  const theme = useTheme();
  const onChange = (time: Dayjs | null, timeString: string) => {
    console.log(time, timeString);
  };
  return (
    <StyledTimePicker
      use12Hours={false}
      format='HH:mm'
      onChange={onChange}
      defaultValue={defaultValue ? dayjs(defaultValue, 'hh:mm') : undefined}
      allowClear={false}
      minuteStep={30}
      showNow={false}
      suffixIcon={<ChevronDown stroke={theme.palette.grey[300]} />}
      size='small'
      placeholder='지정되지 않음'
      style={{
        flex: 1,
        height: '4.8rem',
        fontSize: '1.8rem',
        padding: '1.2rem',
      }}
    />
  );
};

const StyledTimePicker = styled(TimePicker)`
  .ant-picker-clear {
    display: none;
  }
`;
