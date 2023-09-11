import {
  LeftSide,
  ProgressBackground,
  ProgressBar,
  ProgressWrap,
  RightContentWrap,
  RightSide,
  SubTitle,
  Title,
  WhiteTitle,
  Wrap,
} from 'pages/AddShopPage/AddShopPage.styled';
import { StoreInfo } from 'pages/AddShopPage/components/StoreInfo';

/**
 * 가게 추가 페이지
 */
export const AddShopPage: React.FC = () => {
  return (
    <Wrap>
      <LeftSide>
        <WhiteTitle>
          서비스 설명
          <br />
          디자인
        </WhiteTitle>
      </LeftSide>
      <RightSide>
        <RightContentWrap>
          <Title>가게 추가 등록</Title>
          <SubTitle>
            추가로 가게를 등록하고, 간편하게 여러 개의 가게들을 관리할 수
            있어요.
          </SubTitle>
          <ProgressWrap>
            <ProgressBackground>
              <ProgressBar status='SECOND' />
            </ProgressBackground>
          </ProgressWrap>
          <StoreInfo />
        </RightContentWrap>
      </RightSide>
    </Wrap>
  );
};
