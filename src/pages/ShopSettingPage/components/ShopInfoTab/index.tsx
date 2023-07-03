import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';
import {
  ContentWrap,
  CurrentWifiBtn,
  ListItem,
  RadioRow,
  Wrap,
} from 'pages/ShopSettingPage/components/ShopInfoTab/ShopInfoTab.styled';

/**
 * 가게 정보 설정 탭
 */
export const ShopInfoTab: React.FC = () => {
  return (
    <Wrap>
      <ContentWrap>
        <ListItem>
          <Label label='Wi-Fi 등록'>
            <CurrentWifiBtn>현재 연결된 Wi-Fi 등록하기</CurrentWifiBtn>
          </Label>
        </ListItem>
        <ListItem>
          <Input
            label='가게 이름'
            placeholder='가게명을 작성해주세요. (ex. 캐치카페 한양대점)'
          />
        </ListItem>
        <ListItem>
          <Input
            label='한 줄 소개'
            placeholder='가게의 소개글을 작성해주세요. (최대 N자 이내)'
          />
        </ListItem>
        <ListItem>
          <Input label='가게 위치' placeholder='가게 주소 찾기' />
        </ListItem>
        <ListItem>
          <Label label='가게 유형' required={false} />
        </ListItem>
        <RadioRow>
          <Radio
            id='restaurant'
            label='음식점'
            value='음식점'
            name='shopSort'
          />
          <Radio id='cafe' label='카페' value='카페' name='shopSort' />
          <Radio id='cafe' label='모임' value='모임' name='shopSort' />
          <Radio id='etc' label='기타' value='기타' name='shopSort' />
        </RadioRow>
      </ContentWrap>
    </Wrap>
  );
};
