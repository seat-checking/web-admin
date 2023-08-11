import { useTheme } from 'styled-components';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';
import { HelperText } from 'pages/ShopSettingPage/components/HelperText';
import {
  ContentWrap,
  GrayBackground,
  ListItem,
  RadioRow,
  WifiHelperWrap,
  WifiLabelWrap,
  FileInput,
  AddFileBtn,
  AddFileRow,
  LocationBtn,
  UploadIconBox,
} from 'pages/ShopSettingPage/components/ShopInfoTab/ShopInfoTab.styled';

import { Carousel } from 'pages/ShopSettingPage/components/ShopInfoTab/components/Carousel';
import { Wifi } from 'pages/ShopSettingPage/components/ShopInfoTab/components/Wifi';

/**
 * 가게 정보 설정 탭
 */
export const ShopInfoTab: React.FC = () => {
  const theme = useTheme();
  return (
    <ContentWrap>
      <GrayBackground>
        <ListItem>
          <WifiLabelWrap>
            <Label label='Wi-Fi 등록' marginBottom='0' />
            <WifiHelperWrap>
              <HelperText>
                현재 가게에서 사용중인 Wi-Fi를 통해 고객들의 입실과 퇴실 여부를
                확인할 수 있어요.
              </HelperText>
            </WifiHelperWrap>
          </WifiLabelWrap>
          <Wifi />
        </ListItem>
      </GrayBackground>
      <ListItem>
        <Input
          label='가게 이름'
          placeholder='가게명을 작성해주세요. (ex. 캐치카페 한양대점)'
        />
      </ListItem>
      <ListItem>
        <Label label='가게 위치' />
        <LocationBtn>가게 주소 찾기</LocationBtn>
      </ListItem>
      <ListItem>
        <Label label='가게 유형' required={false} />
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
      </ListItem>
      <ListItem>
        <Label label='가게 대표 이미지' />
        <FileInput type='file' hidden />
        <AddFileRow>
          <AddFileBtn backgroundColor={theme.palette.grey[50]}>
            <UploadIconBox />
            첨부파일 업로드 *최대 10장
            <br /> (권장 사이즈 750x480이상)
          </AddFileBtn>
          <Carousel />
        </AddFileRow>
      </ListItem>
      <ListItem>
        <Input
          label='한 줄 소개'
          placeholder='가게의 소개글을 작성해주세요. (최대 N자 이내)'
        />
      </ListItem>
      <ListItem>
        <Button>저장하기</Button>
      </ListItem>
    </ContentWrap>
  );
};
