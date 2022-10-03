import { globalStyle, style } from '@vanilla-extract/css';
import { themeVars } from '../../theme/index.css';

export const styles = {
  root: style({
    vars: {
      '--mdc-theme-secondary': themeVars.color.brand,
      '--mdc-theme-on-surface': themeVars.color.surfaceOn,
    },
  }),
};

globalStyle('.mdc-switch__track', {
  height: 24,
  width: 40,
  borderRadius: themeVars.radius.full,
  opacity: '1 !important',
});

globalStyle('.mdc-switch__thumb', {
  backgroundColor: `${themeVars.color.background} !important`,
  borderColor: `${themeVars.color.background} !important`,
});

globalStyle('.mdc-switch__thumb-underlay', {
  height: 58,
  width: 52,
});
