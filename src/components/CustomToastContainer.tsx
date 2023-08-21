import { Slide, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import checkCircleIcon from 'assets/icons/CheckCircle.svg';

interface CustomToastContainerProps {
  hideProggressBar?: boolean;
}
export const CustomToastContainer = ({
  hideProggressBar = true,
}: CustomToastContainerProps) => {
  return (
    <Wrap>
      <ToastContainer
        closeButton={false}
        position='top-right'
        autoClose={false}
        hideProgressBar={hideProggressBar}
        theme='dark'
        transition={Slide}
        icon={<CheckCircleIcon />}
        className='custom-toast-position'
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  //토스트 커스텀
  /* 테마별 색상 바꾸기 */
  --toastify-color-light: #fff;
  --toastify-color-dark: ${'#303030'};
  --toastify-color-info: #3498db;
  --toastify-color-success: #00ae84;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: #e74c3c;
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);
  /* 테마별 아이콘 색상 바꾸기 */
  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);
  /* 기본 적용 스타일 바꾸기 */
  /* --toastify-toast-width: 320px; */
  --toastify-toast-background: #fff;
  --toastify-toast-min-height: 6.2rem;
  /* --toastify-toast-max-height: 800px; */
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;

  .Toastify__toast {
    border-radius: 0.8rem;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 3rem;
  }
`;

export const CheckCircleIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(${checkCircleIcon});
  background-size: cover;
  margin-bottom: 0.3rem;
`;
