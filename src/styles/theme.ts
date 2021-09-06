import { createTheme, Theme } from '@material-ui/core';

type JssStyles = Record<string, any>;

export type DefaultThemeOptions = {
  mixins: {
    containerStyles: (theme: Theme) => JssStyles;
  };
};

export type CustomTheme = Theme & DefaultThemeOptions;

const quipCustomThemeOptions: DefaultThemeOptions = {
  mixins: {
    containerStyles: (theme: Theme): JssStyles => ({
      paddingLeft: `2%`,
      paddingRight: `2%`,
      [theme.breakpoints.up(`sm`)]: {
        paddingLeft: `5%`,
        paddingRight: `5%`,
      },
      [theme.breakpoints.up(`md`)]: {
        paddingLeft: `7%`,
        paddingRight: `7%`,
      },
      [theme.breakpoints.up(`lg`)]: {
        paddingLeft: `10%`,
        paddingRight: `10%`,
      },
      [theme.breakpoints.up(`xl`)]: {
        paddingLeft: `15%`,
        paddingRight: `15%`,
      },
    }),
  },
};

export const DefaultTheme: Theme = createTheme(
  {
    overrides: {
      MuiButton: {
        root: {
          textTransform: `none`,
        },
      },
      MuiTypography: {
        h1: {
          fontWeight: 600,
        },
        h2: {
          fontWeight: 600,
        },
        h3: {
          fontWeight: 600,
        },
        body1: {
          fontSize: 22,
        },
        body2: {
          fontSize: 18,
        },
      },
    },
  },
  quipCustomThemeOptions,
);
