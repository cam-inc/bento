import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        margin: 0,
        fontSize: themeVars.fontSize.label.large,
        color: themeVars.color.backgroundOn,
      },
    },
  }),
};
