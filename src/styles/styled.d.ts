import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      primary: {
        orange: string;
        dark: string;
      };
      error: {
        main: string;
      };
      success: {
        main: string;
      };
      grey: {
        30: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
      };
      black: {
        main: string;
      };
    };
  }
}
