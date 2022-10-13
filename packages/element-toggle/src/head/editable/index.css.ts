import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.backgroundOnLow,
        fontSize: themeVars.fontSize.label.large,
        display: 'flex',
      },
    },
  }),
  ctrl: style({
    selectors: {
      [`.${EditorClassName} &`]: {
      },
    },
  }),
  body: style({
    selectors: {
      [`.${EditorClassName} &`]: {
      },
    },
  }),
};
