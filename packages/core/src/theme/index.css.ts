import { createThemeContract } from '@vanilla-extract/css';

export const defaultThemeToken = {
  // Follow Tailwind's default spacing scale.
  // @see: https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
  space: {
    '0': '0',
    'px': '1px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '40': '10rem',
  },
  color: {
    background: 'lightgray',
    backgroundOn: 'black',
    light: {
      background: 'lightgray',
      backgroundOn: 'black',
    },
    dark: {
      background: 'black',
      backgroundOn: 'lightgray',
    },
  },
};

export type ThemeToken = typeof defaultThemeToken;

export const themeVars = createThemeContract(defaultThemeToken);
