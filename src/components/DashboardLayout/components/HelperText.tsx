import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as AlertCicleIcon } from 'assets/icons/alert-circle.svg';
import { Tooltip } from 'components/DashboardLayout/components/Tooltip';
import { ALERT_ICON_WIDTH_REM } from 'components/DashboardLayout/utils/constants';

interface HelperTextProps {
  children: React.ReactNode;
}

/**
 * 도움말 문구 컴포넌트 (info 아이콘 + 텍스트), 일시 정지 설명 띄움
 */
export const HelperText: React.FC<HelperTextProps> = ({ children }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleTooltip = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsTooltipOpen(!isTooltipOpen);
  };

  const handleOutsideClick = (event: Event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsTooltipOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <Wrap ref={containerRef} onClick={handleToggleTooltip}>
      <IconWrap>
        <AlertCicleIcon width={ALERT_ICON_WIDTH_REM + 'rem'} />
      </IconWrap>
      <Text>{children}</Text>
      {isTooltipOpen && <Tooltip />}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;

  position: relative;
`;

const IconWrap = styled.div`
  svg {
    path {
      fill: #727582;
    }
  }
`;

const Text = styled.span`
  flex: 1;

  margin-left: 0.4rem;
  color: ${({ theme }) => theme.palette.grey[400]};

  font-size: 1.2rem;
  letter-spacing: -0.897px;
  font-weight: 400;
  line-height: normal;
`;
