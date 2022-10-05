import { globalStyle, style } from '@vanilla-extract/css';
import { EditorClassName, themeVars } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        backgroundColor: themeVars.color.surface,
        borderRadius: themeVars.radius.medium,
        padding: `${themeVars.space[4]} calc(${themeVars.space[4]} + ${themeVars.space[2]})`,
        border: `solid 1px ${themeVars.color.backgroundOnSlight}`,
        width: 388,
      },
    },
  }),
  switchContainer: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        margin: `${themeVars.space[4]} 0`,
        display: 'flex',
        justifyContent: 'right',
        placeItems: 'center',
      },
    },
  }),
  buttonContainer: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        padding: `0 ${themeVars.space[4]}`,
      },
    },
  }),
  errorMessage: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.error,
        fontSize: themeVars.fontSize.label.small,
      },
    },
  }),
};

globalStyle(`${styles.switchContainer} label`, {
  marginRight: themeVars.space[4],
  color: themeVars.color.backgroundOn,
  fontSize: themeVars.fontSize.label.medium,
});

globalStyle(`${styles.buttonContainer} button`, {
  color: themeVars.color.brandOnHigh,
  backgroundColor: themeVars.color.brand,
  padding: `${themeVars.space[2]} 0`,
  fontWeight: 'bold',
});
