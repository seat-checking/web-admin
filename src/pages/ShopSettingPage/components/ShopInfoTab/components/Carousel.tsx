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
export const Carousel: React.FC<CarouselProps> = ({ imgs }) => {
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

  border: 0.1rem solid ${({ theme }) => theme.palette.grey[300]};
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
