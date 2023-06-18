import { useState } from 'react';
import type { JoinStatus } from 'pages/JoinPage/utils/types';
import { AdminInfo } from 'pages/JoinPage/components/AdminInfo';
import { StoreInfo } from 'pages/JoinPage/components/StoreInfo';
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
  const [joinStatus, setJoinStatus] = useState<JoinStatus>('FIRST');

  const handleSwitchPage = (status: JoinStatus) => {
    setJoinStatus(status);
  };

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
              <ProgressBar status={joinStatus} />
            </ProgressBackground>
            <ProgressText>{joinStatus === 'FIRST' ? 1 : 2}/2</ProgressText>
          </ProgressWrap>
          {joinStatus === 'FIRST' ? (
            <AdminInfo onClickNext={handleSwitchPage} />
          ) : (
            <StoreInfo onClickNext={handleSwitchPage} />
          )}
        </RightContentWrap>
      </RightSide>
    </Wrap>
  );
};
