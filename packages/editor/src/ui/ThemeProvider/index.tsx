import React from 'react';

import type { Theme } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  ThemeProvider as MaterialUiThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import { createGenerateClassName } from '@material-ui/styles';
import darkTheme from './DarkTheme/index';
import { themeOptions } from './themeOptions';
export { darkTheme };
import type { Theme as NextuiTheme } from '@nextui-org/react';
import {
  NextUIProvider,
  createTheme as nextCreateTheme,
} from '@nextui-org/react';

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: 'reactPage',
  productionPrefix: 'reactPage',
});
const theme = createMuiTheme(themeOptions);

export type ThemeProviderProps = {
  theme?: Theme;
  nextuiTheme?: NextuiTheme;
};

const nextTheme = nextCreateTheme({
  type: 'light',
  theme: {
    colors: {
      errorLight: '#fce5de',
      primaryLight: '#def5fc',
      secondaryLight: '#bbd9d3',
      secondaryLightHover: '#b3d1c9',
      secondaryLightContrast: '#0D698E',
      primaryLightContrast: '#0D698E',
      error: '#862a0d',
      secondary: '#579D90',
      primary: '#0D698E',
      gradient:
        'linear-gradient(90deg, rgba(87,157,144,1) 0%, rgba(13,105,134,1) 100%)',
    },
  },
});

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  return (
    <NextUIProvider
      theme={props.nextuiTheme ? nextCreateTheme(props.nextuiTheme) : nextTheme}
    >
      <StylesProvider injectFirst={true} generateClassName={generateClassName}>
        <MaterialUiThemeProvider theme={props.theme || theme}>
          {props.children}
        </MaterialUiThemeProvider>
      </StylesProvider>
    </NextUIProvider>
  );
};
