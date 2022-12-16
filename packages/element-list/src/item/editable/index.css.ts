import { style } from '@vanilla-extract/css';
import { EditorClassName, themeVars } from '@bento-editor/core';

export const styles = {
  root: style({
    color: themeVars.color.backgroundOn,
    minWidth: 1,
  }),
  emptyState: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        userSelect: 'none',
        pointerEvents: 'none',
        color: themeVars.color.backgroundOnSlight,
      },
    },
  }),
};
