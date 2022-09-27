import { themeVars } from '@bento-editor/core';
import { globalStyle, style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    color: themeVars.color.backgroundOn,
    display: 'flex',
  }),
  form: style({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'right',
    marginRight: themeVars.space[4],
  }),
  buttonContainer: style({}),
};

globalStyle(`${styles.form} input[type="text"]`, {
  marginBottom: themeVars.space[4],
});

globalStyle(`${styles.form} label`, {
  color: themeVars.color.backgroundOn,
  fontSize: themeVars.fontSize.label.medium,
  marginRight: themeVars.space[4],
});

globalStyle(`${styles.buttonContainer} button`, {
  backgroundColor: `${themeVars.color.brand}`,
  fontWeight: 'bold',
  padding: `${themeVars.space[2]} ${themeVars.space[4]}`,
  fontSize: themeVars.fontSize.label.medium,
  color: themeVars.color.brandOnHigh,
});
