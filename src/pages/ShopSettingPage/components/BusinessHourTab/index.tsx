import { ConfigProvider } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { DayOfWeek, OperatingTimeResponse } from 'api/store/store';
import { getOperatingTime, patchOperatingTime } from 'api/store/store';
import { STORAGE } from 'common/utils/constants';
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

const initialToggledDays = dayCodes.reduce(
  (acc: { [key: string]: boolean }, code) => {
    acc[code] = false;
    return acc;
  },
  {},
);
const nullToUndefined = (value: string | null): string | undefined => {
  return value === null ? undefined : value;
};

export const BusinessHourTab: React.FC = () => {
  const { handleSubmit, control, reset, getValues, watch } =
    useForm<FormValues>({});
  const [operatingTime, setOperatingTime] =
    useState<OperatingTimeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsFormReady] = useState(false);

  const [toggledDays, setToggledDays] = useState<{ [key: string]: boolean }>(
    initialToggledDays,
  );
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const times = ['OpenTime', 'CloseTime'] as const;
  const storeId = localStorage.getItem(STORAGE.storeId) || '';

  const watchedValues = watch();

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

    const breakTime = `${data.breakTimeStart}~${data.breakTimeEnd}`;

    const { breakTimeStart, breakTimeEnd, ...rest } = data;

    const payload = {
      ...rest,
      dayOff,
      breakTime,
    };

    const response = await patchOperatingTime({ storeId, ...payload });
    if (response.isSuccess) {
      toast.success('변경사항이 성공적으로 저장되었습니다.');
    }
  };

  const isFormValid = useCallback(() => {
    for (const dayCode of dayCodes) {
      if (!toggledDays[dayCode]) {
        const openTime = getValues(`${dayCode}OpenTime`);
        const closeTime = getValues(`${dayCode}CloseTime`);

        // 값이 없는 경우
        if (!openTime || !closeTime) {
          return false;
        }
      }
    }
    return true;
  }, [toggledDays, getValues]);

  useEffect(() => {
    setIsFormReady(isFormValid());
  }, [watchedValues, toggledDays, isFormValid]);

  useEffect(() => {
    const fetchOperatingTime = async () => {
      setIsLoading(true);
      try {
        const response = await getOperatingTime({ storeId });

        if (response.isSuccess) {
          const resData = response.result;

          if (resData.breakTime) {
            const [breakTimeStart, breakTimeEnd] = resData.breakTime.split('~');
            resData.breakTimeStart = breakTimeStart.trim();
            resData.breakTimeEnd = breakTimeEnd.trim();
          }

          setOperatingTime(resData);
          reset({
            monOpenTime: nullToUndefined(resData.monOpenTime),
            monCloseTime: nullToUndefined(resData.monCloseTime),
            tueOpenTime: nullToUndefined(resData.tueOpenTime),
            tueCloseTime: nullToUndefined(resData.tueCloseTime),
            wedOpenTime: nullToUndefined(resData.wedOpenTime),
            wedCloseTime: nullToUndefined(resData.wedCloseTime),
            thuOpenTime: nullToUndefined(resData.thuOpenTime),
            thuCloseTime: nullToUndefined(resData.thuCloseTime),
            friOpenTime: nullToUndefined(resData.friOpenTime),
            friCloseTime: nullToUndefined(resData.friCloseTime),
            satOpenTime: nullToUndefined(resData.satOpenTime),
            satCloseTime: nullToUndefined(resData.satCloseTime),
            sunOpenTime: nullToUndefined(resData.sunOpenTime),
            sunCloseTime: nullToUndefined(resData.sunCloseTime),
            breakTimeStart: nullToUndefined(resData.breakTimeStart),
            breakTimeEnd: nullToUndefined(resData.breakTimeEnd),
            useTimeLimit: nullToUndefined(resData.useTimeLimit),
          });
          const updatedToggledDays = dayCodes.reduce(
            (acc: { [key in (typeof dayCodes)[number]]?: boolean }, code) => {
              acc[code] = resData?.dayOff?.includes(
                code.toUpperCase() as DayOfWeek,
              );
              return acc;
            },
            {},
          );

          setToggledDays(updatedToggledDays);
        }
      } catch (error) {
        return;
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
        <form onSubmit={handleSubmit(handleOnSubmit)}>
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
            <Label label='좌석별 최대 이용 시간' required={false} />
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
            {isFormValid() ? (
              <Button type='submit'>저장하기</Button>
            ) : (
              <Button isDisabled>저장하기</Button>
            )}
          </SaveBtnWrap>
        </form>
      </Wrap>
    </ConfigProvider>
  );
};
