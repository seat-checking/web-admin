import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg';
import { ReactComponent as XIcon } from 'assets/icons/x.svg';

import { flexSet } from 'styles/mixin';

interface Image {
  id: number;
  url: string;
}

interface CarouselProps {
  imgs?: Image[];
}

/**
 * 캐러셀 컴포넌트
 */
export const Carousel: React.FC<CarouselProps> = ({
  // imgs,
  imgs = [
    {
      id: 0,
      url: 'https://s3-alpha-sig.figma.com/img/b3df/7e09/8a307db8c10180c72b6ea455fdfe8191?Expires=1692576000&Signature=Q8zuYX8Mug~ADqCuCltBt1K8Ve1eXrbMNnvvtgWnC9KpVTfwv0GMhiWqeEzMKzTJCyHUcOBUW9CtZG1wBNdXTaR7dSAx20GQ0nIANwB3dxU82vdmg3ZBO6oG6E-Vv6lZXz7p2dKoK8hLnONen1Vq5~Lnj4YYRXce-T6e9LE1GFXTu5hpiggJJWABajmSexBGtbF40sMlGj61eQIiYYPDNjkKIZCRQp3iSUnVesf6EmiTHuiGUaDQg2ob2CXUihqIZ29BF7ooS8ASM13s2SasGfa7ANbPr76H-DEsjl2CbUsd2FoCGIKhu1SugevXH1VvnYZxBiDmG7JkALwmMu-kpA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
  ],
}) => {
  const theme = useTheme();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  return (
    <Wrap>
      {!imgs ? (
        <NoImg>등록된 이미지가 없어요.</NoImg>
      ) : (
        <ImgWrap $img={imgs[currentImgIndex].url}>
          <XButtonWrap>
            <XIcon width='2.4rem' stroke={theme.palette.grey[300]} />
          </XButtonWrap>
          <Footer>
            <ChevronRight
              fill={theme.palette.grey[300]}
              width='2.4rem'
              height='2.4rem'
              transform='rotate(180)'
            />
            {`${currentImgIndex}/${imgs.length}`}
            <ChevronRight
              fill={theme.palette.grey[300]}
              width='2.4rem'
              height='2.4rem'
            />
          </Footer>
        </ImgWrap>
      )}
    </Wrap>
  );
};

const Wrap = styled.div<{ $img?: string }>`
  width: 20.2rem;

  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 0.8rem;
  overflow: hidden;
`;

const ImgWrap = styled.div<{ $img?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0.8rem 1rem;
  height: 100%;

  background-image: url(${({ $img }) => $img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
