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
    marginRight: themeVars.space[4],
    maxWidth: 340,
  }),
  switchContainer: style({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
  }),
  buttonContainer: style({}),
  buttonDisabled: style({
    cursor: 'not-allowed',
    color: `${themeVars.color.backgroundOnSlight} !important`,
    backgroundColor: `${themeVars.color.backgroundOnFaint} !important`,
  }),
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
  color: themeVars.color.backgroundOn,
  fontSize: themeVars.fontSize.label.medium,
  marginRight: themeVars.space[4],
});

globalStyle(`${styles.buttonContainer} button`, {
  color: themeVars.color.brandOnHigh,
  backgroundColor: `${themeVars.color.brand}`,
});
