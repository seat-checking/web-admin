import { ConfigProvider } from 'antd';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import {
  DayItem,
  DayText,
  ItemWrap,
  ItemWrapFlex,
  MaxTimeWrap,
  SaveBtnWrap,
  Slash,
  Wrap,
} from 'pages/ShopSettingPage/components/BusinessHourTab/BusinessHourTab.styled';
import { TimeSelect } from 'pages/ShopSettingPage/components/BusinessHourTab/components/TimeSelect';

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
  breakTime: string;
  useTimeLimit: string;
}

export const BusinessHourTab: React.FC = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      monOpenTime: '',
      monCloseTime: '',
      tueOpenTime: '',
      tueCloseTime: '',
      wedOpenTime: '',
      wedCloseTime: '',
      thuOpenTime: '',
      thuCloseTime: '',
      friOpenTime: '',
      friCloseTime: '',
      satOpenTime: '',
      satCloseTime: '',
      sunOpenTime: '',
      sunCloseTime: '',
      breakTime: '',
      useTimeLimit: '',
    },
  });
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const dayCodes = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
  const times = ['OpenTime', 'CloseTime'] as const;

  return (
    <ConfigProvider theme={{ token: { colorPrimary: 'darkorange' } }}>
      <Wrap>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
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
                              onChange={onChange}
                              onBlur={onBlur}
                              selected={value}
                            />
                          )}
                        />
                        {time === 'OpenTime' && <Slash>~</Slash>}
                      </>
                    ))}
                  </ItemWrapFlex>
                </DayItem>
              </ul>
            ))}
          </ItemWrap>
          <ItemWrap>
            <Input
              label='이용 제한 시간'
              placeholder='ex) 11:00~12:00'
              required={false}
            />
          </ItemWrap>
          <ItemWrap>
            <Label label='좌석별 최대 이용 시간' />
            <MaxTimeWrap>
              <Controller
                control={control}
                name='useTimeLimit'
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TimeSelect
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
