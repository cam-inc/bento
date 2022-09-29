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
    justifyContent: 'right',
    marginRight: themeVars.space[4],
  }),
  switchContainer: style({
    display: 'flex',
    alignItems: 'center',
  }),
  buttonContainer: style({}),
  buttonDisabled: style({
    cursor: 'not-allowed',
    color: `${themeVars.color.backgroundOnSlight} !important`,
    backgroundColor: `${themeVars.color.backgroundOnFaint} !important`,
  }),
};

globalStyle(`${styles.field} input[type="text"]`, {
  marginBottom: themeVars.space[4],
});

globalStyle(`${styles.field} label`, {
  color: themeVars.color.backgroundOn,
  fontSize: themeVars.fontSize.label.medium,
  marginRight: themeVars.space[4],
});

globalStyle(`${styles.buttonContainer} button`, {
  color: themeVars.color.brandOnHigh,
  backgroundColor: `${themeVars.color.brand}`,
});
