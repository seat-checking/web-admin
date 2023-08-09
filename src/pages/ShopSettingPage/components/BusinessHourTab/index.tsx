import { ConfigProvider } from 'antd';
import { useTheme } from 'styled-components';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import {
  DayItem,
  DayList,
  DayText,
  LeftWrap,
  ListItem,
  ListItemFlex,
  MaxTimeWrap,
  OpenText,
  RightWrap,
  SaveBtnWrap,
  Slash,
  Wrap,
} from 'pages/ShopSettingPage/components/BusinessHourTab/BusinessHourTab.styled';
import { TimeSelect } from 'pages/ShopSettingPage/components/BusinessHourTab/components/TimeSelect';
import { HelperText } from 'pages/ShopSettingPage/components/HelperText';
import { Toggle } from 'pages/ShopSettingPage/components/SettingSideBar/Toggle';

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
        <ListItemFlex>
          <LeftWrap>
            <Label label='임시 휴무' />
            <HelperText>
              임시적으로 가게 영업이 어려울 때 사용( 고객이 우리 가게를 볼 수
              있고, 예약도 신청할 수 있어요!)
            </HelperText>
          </LeftWrap>
          <RightWrap>
            <Toggle />
            <OpenText>
              일시 정지 <span className='orange'>OFF</span>
            </OpenText>
          </RightWrap>
        </ListItemFlex>
        <ListItem>
          <DayList>
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
          </DayList>
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
