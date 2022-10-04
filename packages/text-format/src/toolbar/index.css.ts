import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  list: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'flex',
      },
    },
  }),
  button: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'block',
        width: 20,
        height: 20,
        color: themeVars.color.backgroundOn,
      },
    },
  }),
};
