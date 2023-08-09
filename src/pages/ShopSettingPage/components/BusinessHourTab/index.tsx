import { ConfigProvider } from 'antd';
import { useTheme } from 'styled-components';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import {
  DayItem,
  DayText,
  ListItem,
  ListItemFlex,
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
        <ListItem>
          <ul>
            {days.map((day) => (
              <DayItem key={day}>
                <DayText>{`${day}요일`}</DayText>
                <ListItemFlex>
                  <TimeSelect defaultValue='09:00' />
                  <Slash>~</Slash>
                  <TimeSelect />
                </ListItemFlex>
              </DayItem>
            ))}
          </ul>
        </ListItem>
        <ListItem>
          <Input
            label='이용 제한 시간'
            placeholder='ex) 11:00~12:00'
            required={false}
          />
        </ListItem>
        <ListItem>
          <Label label='좌석별 최대 이용 시간' />
          <MaxTimeWrap>
            <TimeSelect />
          </MaxTimeWrap>
        </ListItem>
        <SaveBtnWrap>
          <Button>저장하기</Button>
        </SaveBtnWrap>
      </Wrap>
    </ConfigProvider>
  );
};
