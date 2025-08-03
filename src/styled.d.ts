import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    _breakpoints: {
      sm: string;
      md: string;
      lg: string;
      [key: string]: string;
    };
    _colors: {
      primary: {
        [key: string]: string;
      };
      [key: string]: Record<string, string>;
    };
  }
}
