import { createGlobalStyle, css } from 'styled-components';

const BREAKPOINTS = new Map([
  [2000, 56],
  [1700, 50],
  [1500, 45],
  // [1300, 40],
]);

/**
    우영 모니터: 1713px
    수민 모니터: 1328px (ipad)
    */
const responsiveStyles = Array.from(BREAKPOINTS).map(
  ([maxWidth, fontSize]) => css`
    @media all and (max-width: ${maxWidth}px) {
      font-size: ${fontSize}%;
    }
  `,
);

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%; // 1rem = 10px 로 변경
    
    ${responsiveStyles}

  }
  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // 스크롤바 유무에 의해 레이아웃이 흐트러지는 걸 막기 위함
    overflow-y: scroll;
  }

  // reset css
  * {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
  }
  *,
  :after,
  :before {
    box-sizing: border-box;
    flex-shrink: 0;
  }
  :root {
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    cursor: default;
    line-height: 1.5;
    overflow-wrap: break-word;
    word-break: break-word;
    tab-size: 4;
  }
  html,
  body,
  #root {
    height: 100%;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  button {
    background: none;
    border: 0;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  // 인풋 기본 스타일 제거
  input {
    border: none;
    /* background-color: transparent; */
    /* -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none; */
  }
  // 인풋 태그 테두리 하이라이트 제거
  input:focus {
    outline: none;
  }
  /* select css 없애기 */
  select {
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
  }
  li {
    list-style-type: none;
  }
`;
