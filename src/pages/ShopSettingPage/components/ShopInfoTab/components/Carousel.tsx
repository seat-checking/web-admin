import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import type { ImgFile } from 'pages/ShopSettingPage/components/ShopInfoTab';
import type { ChangeEvent } from 'react';
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg';
import { ReactComponent as XIcon } from 'assets/icons/x.svg';

import { flexSet } from 'styles/mixin';

interface CarouselProps {
  imgs?: (string | ImgFile)[];
  setImgFiles: (event: (string | ImgFile)[] | ChangeEvent<Element>) => void;
}

/**
 * 캐러셀 컴포넌트
 */
export const Carousel: React.FC<CarouselProps> = ({ imgs, setImgFiles }) => {
  const theme = useTheme();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleShowNextImg = () => {
    if (!imgs) {
      return;
    }
    const imgCount = imgs.length;
    setCurrentImgIndex((prev) => (prev < imgCount - 1 ? prev + 1 : prev));
  };

  const handleShowPrevImg = () => {
    setCurrentImgIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // const handleDeleteImg = (imgName: string) => {
  //   if (!imgs) {
  //     return;
  //   }
  //   const isLastImg = currentImgIndex === imgs.length - 1;
  //   if (isLastImg && currentImgIndex !== 0) {
  //     setCurrentImgIndex((prev) => prev - 1);
  //   }
  //   const deleted = imgs?.filter((img) => img.name !== imgName);
  //   setImgFiles(deleted);
  // };

  return (
    <Wrap>
      {!imgs || imgs.length === 0 ? (
        <NoImg>등록된 이미지가 없어요.</NoImg>
      ) : (
        <ImgWrap
          $img={
            typeof imgs[currentImgIndex] === 'string'
              ? imgs[currentImgIndex]
              : ((imgs[currentImgIndex] as ImgFile).thumbnail as string)
          }
        >
          {/* <XButtonWrap
            onClick={() => handleDeleteImg(imgs[currentImgIndex].name)}
          >
            <XIcon width='2.4rem' stroke={theme.palette.grey[300]} />
          </XButtonWrap> */}
          <Footer>
            <ChevronRight
              fill={theme.palette.grey[300]}
              width='2.4rem'
              height='2.4rem'
              transform='rotate(180)'
              onClick={handleShowPrevImg}
            />
            {`${currentImgIndex + 1}/${imgs.length}`}
            <ChevronRight
              fill={theme.palette.grey[300]}
              width='2.4rem'
              height='2.4rem'
              onClick={handleShowNextImg}
            />
          </Footer>
        </ImgWrap>
      )}
    </Wrap>
  );
};

const Wrap = styled.div<{ $img?: string | ImgFile }>`
  width: 20.2rem;

  border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 0.8rem;
  overflow: hidden;
`;

const ImgWrap = styled.div<{ $img?: string | ImgFile }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0.8rem 1rem;
  height: 100%;

  background-image: url(${({ $img }) => `${$img}`});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  transition: all 0.3s;
`;

const XButtonWrap = styled.button`
  margin-left: auto;
`;

const NoImg = styled.div`
  height: 100%;
  ${flexSet()};

  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.4rem;
  font-weight: 600;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;

  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.6rem;
  font-weight: 400;
`;
