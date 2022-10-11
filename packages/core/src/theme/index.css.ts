import { createThemeContract } from '@vanilla-extract/css';

export const defaultThemeToken = {
  // Follow Tailwind's default spacing scale.
  // @see: https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
  space: {
    '0': '0',
    px: '1px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '8': '2rem',
    '9': '2.25rem',
    '40': '10rem',
  },
  radius: {
    small: '4px',
    medium: '8px',
    full: '9999px',
  },
  opacity: {
    none: '0',
    hover: '0.08',
    active: '0.12',
  },
  fontSize: {
    heading: {
      large: '32px',
      medium: '28px',
      small: '24px',
    },
    label: {
      large: '16px',
      medium: '14px',
      small: '12px',
    },
  },
  boxShadow: {
    level: {
      '1': '0px 1px 2px rgba(81, 86, 169, 0.3), 0px 2px 6px rgba(81, 86, 169, 0.15)',
    },
  },
  editor: {
    padding: '10rem',
  },
  color: {
    // Same values as the ones of light mode.
    background: '#FFFFFF',
    backgroundOnHigh: '#1C1E34',
    backgroundOn: '#3C4256',
    backgroundOnLow: '#1C1E34',
    backgroundOnSlight: '#BCC5D6',
    backgroundOnFaint: '#EBEEF6',
    surface: '#FFFFFF',
    surfaceOnHigh: '#1C1E34',
    surfaceOn: '#3C4256',
    surfaceOnLow: '#1C1E34',
    surfaceOnSlight: '#BCC5D6',
    surfaceOnFaint: '#BCC5D6',
    surfaceInverted: '#1C1E34',
    surfaceInvertedOnHigh: '#FFFFFF',
    surfaceInvertedOn: '#DCE1F0',
    surfaceInvertedOnLow: '#AAACBE',
    surfaceInvertedOnSlight: '#676E84',
    surfaceInvertedOnFaint: '#3C4256',
    brand: '#2A62D5',
    brandOnHigh: '#FFFFFF',
    brandOn: '#EAEFFB',
    brandOnLow: '#7FA1E6',
    brandOnSlight: '#5482DE',
    brandOnFaint: '#214FAB',
    error: '#BA1A1A',
    errorOnHigh: '#FFFFFF',
    errorOn: '#FFEDEA',
    errorOnLow: '#FF897D',
    errorOnSlight: '#DE3730',
    errorOnFaint: '#93000A',
    accentXXC60: '#FFAF33',
    accentXXD90: '#FFF6CC',
    accentXXJ95: '#FFE9E5',
    accentXXJ70: '#FF7B66',
    light: {
      background: '#FFFFFF',
      backgroundOnHigh: '#1C1E34',
      backgroundOn: '#3C4256',
      backgroundOnLow: '#1C1E34',
      backgroundOnSlight: '#BCC5D6',
      backgroundOnFaint: '#EBEEF6',
      surface: '#FFFFFF',
      surfaceOnHigh: '#1C1E34',
      surfaceOn: '#3C4256',
      surfaceOnLow: '#1C1E34',
      surfaceOnSlight: '#BCC5D6',
      surfaceOnFaint: '#BCC5D6',
      surfaceInverted: '#1C1E34',
      surfaceInvertedOnHigh: '#FFFFFF',
      surfaceInvertedOn: '#DCE1F0',
      surfaceInvertedOnLow: '#AAACBE',
      surfaceInvertedOnSlight: '#676E84',
      surfaceInvertedOnFaint: '#3C4256',
      brand: '#2A62D5',
      brandOnHigh: '#FFFFFF',
      brandOn: '#EAEFFB',
      brandOnLow: '#7FA1E6',
      brandOnSlight: '#5482DE',
      brandOnFaint: '#214FAB',
      error: '#BA1A1A',
      errorOnHigh: '#FFFFFF',
      errorOn: '#FFEDEA',
      errorOnLow: '#FF897D',
      errorOnSlight: '#DE3730',
      errorOnFaint: '#93000A',
      accentXXC60: '#FFAF33',
      accentXXD90: '#FFF6CC',
      accentXXJ95: '#FFE9E5',
      accentXXJ70: '#FF7B66',
    },
    dark: {
      background: '#1C1E34',
      backgroundOnHigh: '#FFFFFF',
      backgroundOn: '#EBEEF6',
      backgroundOnLow: '#AAACBE',
      backgroundOnSlight: '#676E84',
      backgroundOnFaint: '#3C4256',
      surface: '#1C1E34',
      surfaceOnHigh: '#FFFFFF',
      surfaceOn: '#EBEEF6',
      surfaceOnLow: '#AAACBE',
      surfaceOnSlight: '#676E84',
      surfaceOnFaint: '#3C4256',
      surfaceInverted: '#FFFFFF',
      surfaceInvertedOnHigh: '#1C1E34',
      surfaceInvertedOn: '#3C4256',
      surfaceInvertedOnLow: '#676E84',
      surfaceInvertedOnSlight: '#BCC5D6',
      surfaceInvertedOnFaint: '#EBEEF6',
      brand: '#AAC1EE',
      brandOnHigh: '#08142B',
      brandOn: '#193B80',
      brandOnLow: '#2A62D5',
      brandOnSlight: '#7FA1E6',
      brandOnFaint: '#EAEFFB',
      error: '#FFB4AB',
      errorOnHigh: '#410002',
      errorOn: '#93000A',
      errorOnLow: '#DE3730',
      errorOnSlight: '#FF897D',
      errorOnFaint: '#FFEDEA',
      accentXXC60: '#FFAF33',
      accentXXD90: '#FFF6CC',
      accentXXJ95: '#FFE9E5',
      accentXXJ70: '#FF7B66',
    },
  },
};

export type ThemeToken = typeof defaultThemeToken;

export const themeVars = createThemeContract(defaultThemeToken);
