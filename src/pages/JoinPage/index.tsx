import { AdminInfo } from 'pages/JoinPage/components/AdminInfo';
import {
  LeftSide,
  ProgressBackground,
  ProgressBar,
  ProgressText,
  ProgressWrap,
  RightContentWrap,
  RightSide,
  Title,
  WhiteTitle,
  Wrap,
} from 'pages/JoinPage/styled';

/**
 * 회원가입 페이지
 */
export const JoinPage: React.FC = () => {
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
          <Title>관리자 회원가입</Title>
          <ProgressWrap>
            <ProgressBackground>
              <ProgressBar />
            </ProgressBackground>
            <ProgressText>1/2</ProgressText>
          </ProgressWrap>
          <AdminInfo />
        </RightContentWrap>
      </RightSide>
    </Wrap>
  );
};
