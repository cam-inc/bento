import { style } from '@vanilla-extract/css';
import { EditorClassName, themeVars } from '@bento-editor/core';

export const styles = {
  root: style({
    color: themeVars.color.backgroundOn,
    minWidth: 1,
  }),
  placeholder: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        // fontSize: themeVars.fontSize.heading.large,
      },
    },
  }),
};
