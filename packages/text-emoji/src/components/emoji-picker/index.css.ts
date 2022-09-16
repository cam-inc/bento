import { themeVars } from '@bento-editor/core';
import { globalStyle, style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    width: 'fit-content',
    borderRadius: themeVars.radius.medium,
  }),
};

// @see https://github.com/missive/emoji-mart/blob/main/packages/emoji-mart-website/example-custom-styles.html#L7-L24
globalStyle(`${styles.root} > em-emoji-picker`, {
  margin: 0,
  vars: {
    '--font-family': `
      system-ui,
      -apple-system,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji'
    `,
    '--font-size': themeVars.fontSize.label.medium,
    '--border-radius': themeVars.radius.medium,
    '--padding': themeVars.space[4],
    '--background-rgb': themeVars.color.backgroundOn,
    '--rgb-input': themeVars.color.backgroundOn,
  },
});

globalStyle(`${styles.root} > em-emoji-picker > input`, {
  border: `solid ${themeVars.color.backgroundOnSlight}`,
});
