import { Controller, useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import type { Address } from 'react-daum-postcode';
import type { SubmitHandler } from 'react-hook-form';

import { useAddress } from 'common/hooks/useAddress';
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
  GappedErrorMessage,
} from 'pages/ShopSettingPage/components/ShopInfoTab/ShopInfoTab.styled';

import { Carousel } from 'pages/ShopSettingPage/components/ShopInfoTab/components/Carousel';

interface ShopSettingForm {
  storeName: string;
  address: string;
  detailAddress: string;
  shopType: '음식점' | '카페' | '모임';
  mainImage: string;
  introduction: string;
}
/**
 * 가게 정보 설정 탭
 */
export const ShopInfoTab: React.FC = () => {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<ShopSettingForm>();

  const { open, handleComplete } = useAddress();

  const onSubmit: SubmitHandler<ShopSettingForm> = (data) => {
    console.log('errors :>> ', errors);
    //   addShopMutate(data, {
    //     onSuccess: () => {
    //       navigate(`/`);
    //     },
    //     onError: (error) => {
    //       console.log(error);
    //     },
    //   });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContentWrap>
        <ListItem>
          <Input
            label='가게 이름'
            placeholder='가게명을 작성해주세요. (ex. 캐치카페 한양대점)'
            {...register('storeName', {
              required: '가게 이름은 필수 입력입니다.',
            })}
          />
          {errors.storeName && (
            <GappedErrorMessage>{errors.storeName?.message}</GappedErrorMessage>
          )}
        </ListItem>
        <ListItem>
          <Label label='가게 위치' />
          <Controller
            control={control}
            name='address'
            rules={{ required: '주소를 선택해주세요' }}
            render={({ field: { onChange, value } }) => (
              <AddressBox
                value={value}
                onClick={(e) => {
                  e.preventDefault();
                  open({
                    onComplete: (data: Address) => {
                      const fullAddress = handleComplete(data);
                      onChange(fullAddress);
                    },
                  });
                }}
              />
            )}
          />
          <Input
            placeholder='상세 주소'
            {...register('detailAddress', {
              required: '상세 주소를 입력해주세요.',
            })}
          />
          {errors.address && (
            <GappedErrorMessage>{errors.address?.message}</GappedErrorMessage>
          )}
          {errors.detailAddress && (
            <GappedErrorMessage>
              {errors.detailAddress?.message}
            </GappedErrorMessage>
          )}
        </ListItem>
        <ListItem>
          <Label label='가게 유형' required={false} />
          <RadioRow>
            <Radio
              id='restaurant'
              label='음식점'
              value='음식점'
              {...register('shopType', {
                required: '가게 유형을 선택해주세요.',
              })}
            />
            <Radio
              id='cafe'
              label='카페'
              value='카페'
              {...register('shopType', {
                required: '가게 유형을 선택해주세요.',
              })}
            />
            <Radio
              id='gathering'
              label='모임'
              value='모임'
              {...register('shopType', {
                required: '가게 유형을 선택해주세요.',
              })}
            />
          </RadioRow>
          {errors.shopType && (
            <GappedErrorMessage>{errors.shopType?.message}</GappedErrorMessage>
          )}
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
            {...register('introduction', {
              required: '가게 이름은 필수 입력입니다.',
            })}
          />
          {errors.introduction && (
            <GappedErrorMessage>
              {errors.introduction?.message}
            </GappedErrorMessage>
          )}
        </ListItem>
        <ListItem>
          <Button type='submit'>저장하기</Button>
        </ListItem>
      </ContentWrap>
    </form>
  );
};
