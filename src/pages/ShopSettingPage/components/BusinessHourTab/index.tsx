import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { DayOfWeek, OperatingTimeResponse } from 'api/store/store';
import { getOperatingTime, patchOperatingTime } from 'api/store/store';
import { Button } from 'components/Button';
import { Label } from 'components/Label';
import {
  DayItem,
  DayText,
  ItemWrap,
  ItemWrapFlex,
  MaxTimeWrap,
  SaveBtnWrap,
  Slash,
  ToggleWrap,
  Wrap,
} from 'pages/ShopSettingPage/components/BusinessHourTab/BusinessHourTab.styled';
import { TimeSelect } from 'pages/ShopSettingPage/components/BusinessHourTab/components/TimeSelect';
import ToggleSwitch from 'pages/ShopSettingPage/components/BusinessHourTab/components/ToggleSwitch';

type ExtendedOperatingTimeResponse = OperatingTimeResponse & {
  breakTimeStart: string;
  breakTimeEnd: string;
};

interface FormValues {
  monOpenTime: string;
  monCloseTime: string;
  tueOpenTime: string;
  tueCloseTime: string;
  wedOpenTime: string;
  wedCloseTime: string;
  thuOpenTime: string;
  thuCloseTime: string;
  friOpenTime: string;
  friCloseTime: string;
  satOpenTime: string;
  satCloseTime: string;
  sunOpenTime: string;
  sunCloseTime: string;
  breakTimeStart: string;
  breakTimeEnd: string;
  useTimeLimit: string;
}

const dayCodes = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

// 1. 초기값 설정 추가
const initialToggledDays = dayCodes.reduce(
  (acc: { [key: string]: boolean }, code) => {
    acc[code] = false;
    return acc;
  },
  {},
);

export const BusinessHourTab: React.FC = () => {
  const { handleSubmit, control, reset } = useForm<FormValues>({});
  const [operatingTime, setOperatingTime] =
    useState<ExtendedOperatingTimeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [toggledDays, setToggledDays] = useState<{ [key: string]: boolean }>(
    initialToggledDays,
  );
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const times = ['OpenTime', 'CloseTime'] as const;
  const storeId = localStorage.getItem('storeId') || '';

  const handleToggle = (day: string, active: boolean) => {
    setToggledDays((prev) => ({
      ...prev,
      [day]: active,
    }));
  };
  const handleOnSubmit = async (data: FormValues) => {
    const dayOff = Object.keys(toggledDays)
      .filter((day) => toggledDays[day])
      .map((day) => day.toUpperCase());

    const payload = {
      ...data,
      dayOff,
    };
    const response = await patchOperatingTime({ storeId, ...payload });
    if (response.isSuccess) {
      alert('Success');
    }
  };
  useEffect(() => {
    const fetchOperatingTime = async () => {
      setIsLoading(true);
      try {
        const response = await getOperatingTime({ storeId });
        if (response.isSuccess) {
          const { dayOff, breakTime, ...rest } = response.result;
          const [breakTimeStart, breakTimeEnd] = breakTime.split('~');
          const newOperatingTime = {
            ...rest,
            dayOff,
            breakTime,
            breakTimeStart,
            breakTimeEnd,
          };
          setOperatingTime(newOperatingTime);
          reset(newOperatingTime);

          const updatedToggledDays = dayCodes.reduce(
            (acc: { [key: string]: boolean }, code) => {
              acc[code] = dayOff.includes(code.toUpperCase() as DayOfWeek);
              return acc;
            },
            {},
          );
          setToggledDays(updatedToggledDays);
        } else {
          console.error('Error:', response.message);
        }
      } catch (error) {
        console.error('Error fetching operating time:', error);
      }
      setIsLoading(false);
    };
    fetchOperatingTime();
  }, [storeId, reset]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: 'darkorange' } }}>
      <Wrap>
        <form
          onSubmit={handleSubmit((data) => console.log(handleOnSubmit(data)))}
        >
          <ItemWrap>
            {dayCodes.map((dayCode, index) => (
              <ul key={dayCode}>
                <DayItem>
                  <DayText>{days[index]}요일</DayText>
                  <ItemWrapFlex>
                    {times.map((time) => (
                      <>
                        <Controller
                          key={`${dayCode}${time}`}
                          control={control}
                          name={`${dayCode}${time}`}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TimeSelect
                              defaultValue={
                                operatingTime &&
                                operatingTime[`${dayCode}${time}`]
                              }
                              onChange={onChange}
                              onBlur={onBlur}
                              selected={value}
                              disabled={toggledDays[dayCode]}
                            />
                          )}
                        />
                        {time === 'OpenTime' && <Slash>~</Slash>}
                      </>
                    ))}
                    <ToggleWrap>
                      휴무일
                      <ToggleSwitch
                        checked={toggledDays[dayCode]}
                        onToggle={(active) => handleToggle(dayCode, active)}
                      />
                    </ToggleWrap>
                  </ItemWrapFlex>
                </DayItem>
              </ul>
            ))}
          </ItemWrap>
          <DayText>이용 제한 시간</DayText>
          <ItemWrapFlex>
            <Controller
              control={control}
              name='breakTimeStart'
              render={({ field: { onChange, onBlur, value } }) => (
                <TimeSelect
                  defaultValue={operatingTime?.breakTimeStart}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
            <Slash>~</Slash>
            <Controller
              control={control}
              name='breakTimeEnd'
              render={({ field: { onChange, onBlur, value } }) => (
                <TimeSelect
                  defaultValue={operatingTime?.breakTimeEnd}
                  onChange={onChange}
                  onBlur={onBlur}
                  selected={value}
                />
              )}
            />
          </ItemWrapFlex>
          <ItemWrap>
            <Label label='좌석별 최대 이용 시간' />
            <MaxTimeWrap>
              <Controller
                control={control}
                name='useTimeLimit'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TimeSelect
                    defaultValue={operatingTime?.useTimeLimit}
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                  />
                )}
              />
            </MaxTimeWrap>
          </ItemWrap>
          <SaveBtnWrap>
            <Button type='submit'>저장하기</Button>
          </SaveBtnWrap>
        </form>
      </Wrap>
    </ConfigProvider>
  );
};
