import { ConfigProvider } from 'antd';
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

const days = ['월', '화', '수', '목', '금', '토', '일'];
/**
 * 영업 시간 설정 탭
 */
export const BusinessHourTab: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: 'darkorange' },
      }}
    >
      <Wrap>
        <ItemWrap>
          <ul>
            {days.map((day) => (
              <DayItem key={day}>
                <DayText>{`${day}요일`}</DayText>
                <ItemWrapFlex>
                  <TimeSelect defaultValue='09:00' />
                  <Slash>~</Slash>
                  <TimeSelect />
                </ItemWrapFlex>
              </DayItem>
            ))}
          </ul>
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
            <TimeSelect />
          </MaxTimeWrap>
        </ItemWrap>
        <SaveBtnWrap>
          <Button>저장하기</Button>
        </SaveBtnWrap>
      </Wrap>
    </ConfigProvider>
  );
};
