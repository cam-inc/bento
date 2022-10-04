import { style, globalStyle } from '@vanilla-extract/css';
import { themeVars } from '@bento-editor/core';

export const styles = {
  root: style({
    color: themeVars.color.backgroundOn,
    display: 'flex',
  }),
  field: style({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    marginRight: themeVars.space[4],
    maxWidth: 340,
  }),
  buttonContainer: style({}),
  errorMessage: style({
    color: themeVars.color.error,
    fontSize: themeVars.fontSize.label.small,
    marginBottom: themeVars.space[2],
  }),
};

globalStyle(`${styles.field} input[type="text"]`, {
  marginBottom: themeVars.space[4],
});

globalStyle(`${styles.field} label`, {
  color: themeVars.color.backgroundOnLow,
  fontSize: themeVars.fontSize.label.small,
});

globalStyle(`${styles.buttonContainer} button`, {
  color: themeVars.color.brandOnHigh,
  backgroundColor: `${themeVars.color.brand}`,
  padding: `${themeVars.space[2]} ${themeVars.space[4]}`,
  fontWeight: 'bold',
});
