import styled from 'styled-components';
import type React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onToggle?: (active: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onToggle,
}) => {
  const handleChange = () => {
    if (onToggle) onToggle(!checked);
  };

  return (
    <SwitchContainer>
      <SwitchInput type='checkbox' checked={checked} onChange={handleChange} />
      <SwitchSlider active={checked} />
    </SwitchContainer>
  );
};

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SwitchSlider = styled.span<{ active: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.active
      ? props.theme.palette.primary.orange
      : props.theme.palette.grey[300]};
  transition: 0.4s;
  border-radius: 24px; // 수정: 원래 반지름이 더 크기 때문에 이 값을 조절해야 합니다.

  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 2px; // 슬라이더 움직임의 시작 위치를 조절합니다.
    bottom: 2px; // 슬라이더 움직임의 시작 위치를 조절합니다.
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(props) =>
      props.active
        ? 'translateX(16px)'
        : 'none'}; // 수정: 움직이는 거리를 조절해야 합니다.
  }
`;
