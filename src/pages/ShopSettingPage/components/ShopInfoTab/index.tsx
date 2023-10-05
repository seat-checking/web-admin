import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import type { ShopInformationForm } from 'common/utils/types';
import type { ChangeEvent } from 'react';
import type { Address } from 'react-daum-postcode';
import type { SubmitHandler } from 'react-hook-form';

import { useEditShopInformation } from 'common/hooks/mutations/useEditShopInformation';
import { useAddress } from 'common/hooks/useAddress';
import { AddressBox } from 'components/AddressBox';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Radio } from 'components/Radio';
import {
  ContentWrap,
  ListItem,
  RadioRow,
  FileInput,
  AddFileBtn,
  AddFileRow,
  UploadIconBox,
  GappedErrorMessage,
} from 'pages/ShopSettingPage/components/ShopInfoTab/ShopInfoTab.styled';

import { Carousel } from 'pages/ShopSettingPage/components/ShopInfoTab/components/Carousel';

export interface ImgFile {
  name: string;
  file: File;
  thumbnail: string;
}

interface ShopInfoTabProps {
  shopInformation: ShopInformationForm | undefined;
}
/**
 * 가게 정보 설정 탭
 */
export const ShopInfoTab: React.FC<ShopInfoTabProps> = ({
  shopInformation,
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<ShopInformationForm>({
    defaultValues: shopInformation,
  });

  const { open, handleComplete } = useAddress();
  const { mutate: editShopSettingMutate } = useEditShopInformation();

  const handleOpenFileUpload = (event: React.MouseEvent) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleUploadFile = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (event: (string | ImgFile)[] | ChangeEvent<Element>) => void,
    prevImgs: (string | ImgFile)[] | null,
  ) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      if (prevImgs && files.length + prevImgs.length > 10) {
        setError('storeImages', {
          type: 'custom',
          message: '최대 10장의 이미지를 등록할 수 있습니다.',
        });
        return;
      }
      const fileList = Array.prototype.map.call<
        FileList,
        [(file: File) => ImgFile],
        ImgFile[]
      >(files, (file: File) => ({
        name: file.name,
        file,
        thumbnail: URL.createObjectURL(file),
      }));
      if (!prevImgs) {
        onChange(fileList);
        return;
      }
      onChange([...prevImgs, ...fileList]);
    }
  };

  const onSubmit: SubmitHandler<ShopInformationForm> = (data) => {
    editShopSettingMutate({ ...data });
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
          <Input
            label='가게 전화번호'
            placeholder='(ex. 010-1234-5678)'
            {...register('telNum', {
              required: '가게 전화번호는 필수 입력입니다.',
            })}
          />
          {errors.telNum && (
            <GappedErrorMessage>{errors.telNum?.message}</GappedErrorMessage>
          )}
        </ListItem>
        <ListItem>
          <Label label='가게 유형' required={false} />
          <RadioRow>
            <Radio
              id='restaurant'
              label='음식점'
              value='음식점'
              {...register('category', {
                required: '가게 유형을 선택해주세요.',
              })}
            />
            <Radio
              id='cafe'
              label='카페'
              value='카페'
              {...register('category', {
                required: '가게 유형을 선택해주세요.',
              })}
            />
            <Radio
              id='gathering'
              label='모임'
              value='모임'
              {...register('category', {
                required: '가게 유형을 선택해주세요.',
              })}
            />
          </RadioRow>
          {errors.category && (
            <GappedErrorMessage>{errors.category?.message}</GappedErrorMessage>
          )}
        </ListItem>
        <ListItem>
          <Label label='가게 대표 이미지' />
          <Controller
            control={control}
            name='storeImages'
            rules={{ required: '이미지를 선택해주세요.' }}
            render={({ field: { onChange: onChangeValue, value } }) => (
              <>
                <FileInput
                  type='file'
                  hidden
                  accept='image/jpeg, image/png, image/jpg'
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => {
                    handleUploadFile(e, onChangeValue, value);
                  }}
                />
                <AddFileRow>
                  <AddFileBtn
                    backgroundColor={theme.palette.grey[50]}
                    onClick={handleOpenFileUpload}
                  >
                    <UploadIconBox />
                    첨부파일 업로드 *최대 10장
                    <br /> (권장 사이즈 750x480이상)
                  </AddFileBtn>
                  <Carousel imgs={value} setImgFiles={onChangeValue} />
                </AddFileRow>
              </>
            )}
          />
          {errors.storeImages && (
            <GappedErrorMessage>
              {errors.storeImages?.message}
            </GappedErrorMessage>
          )}
        </ListItem>
        <ListItem>
          <Input
            label='한 줄 소개'
            maxLength={30}
            placeholder='가게의 소개글을 작성해주세요. (최대 30자 이내)'
            {...register('introduction', {
              required: '한 줄 소개는 필수 입력입니다.',
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
