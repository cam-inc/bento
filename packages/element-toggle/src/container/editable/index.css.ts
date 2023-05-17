import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.backgroundOn,
        padding: `${themeVars.space['4']} 0`,
      },
    },
  }),
};
