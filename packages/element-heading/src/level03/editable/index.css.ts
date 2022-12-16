import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        margin: 0,
        fontSize: themeVars.fontSize.heading.small,
        fontWeight: 'bold',
        color: themeVars.color.backgroundOn,
      },
    },
  }),
  emptyState: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        fontSize: themeVars.fontSize.heading.small,
        fontWeight: 'bold',
        userSelect: 'none',
        pointerEvents: 'none',
        color: themeVars.color.backgroundOnSlight,
      },
    },
  }),
};
