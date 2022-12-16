import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.backgroundOn,
        display: 'flex',
        gap: themeVars.space['2'],
      },
    },
  }),
  text: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        minWidth: 1,
      },
    },
  }),
  checkbox: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'block',
        width: 18,
        height: 18,
      },
    },
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
        paddingLeft: `calc(${themeVars.space[6]} + 3px)`,
        whiteSpace: 'pre',
      },
    },
  }),
};
