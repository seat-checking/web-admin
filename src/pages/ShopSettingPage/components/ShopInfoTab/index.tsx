import { useTheme } from 'styled-components';

import { AddressBox } from 'components/AddressBox';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';
import {
  ContentWrap,
  GrayBackground,
  ListItem,
  RadioRow,
  FileInput,
  AddFileBtn,
  AddFileRow,
  UploadIconBox,
} from 'pages/ShopSettingPage/components/ShopInfoTab/ShopInfoTab.styled';

import { Carousel } from 'pages/ShopSettingPage/components/ShopInfoTab/components/Carousel';

/**
 * 가게 정보 설정 탭
 */
export const ShopInfoTab: React.FC = () => {
  const theme = useTheme();
  return (
    <ContentWrap>
      <ListItem>
        <Input
          label='가게 이름'
          placeholder='가게명을 작성해주세요. (ex. 캐치카페 한양대점)'
        />
      </ListItem>
      <ListItem>
        <Label label='가게 위치' />
        {/* // TODO 기능 구현 미완 */}
        <AddressBox
          value=''
          onClick={() => {
            console.log(3);
          }}
        />
        <Input placeholder='상세 주소' value='' />
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
          <Radio id='gathering' label='모임' value='모임' name='shopSort' />
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
