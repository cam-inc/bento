import { themeVars, EditorClassName } from '@bento-editor/core';
import { style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        backgroundColor: themeVars.color.accentXXD,
        display: 'flex',
        gap: themeVars.space['2'],
        padding: `${themeVars.space[3]} ${themeVars.space[4]}`,
        color: themeVars.color.accentXXDOn,
      },
    },
  }),
  icon: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'block',
        width: 20,
        height: 20,
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
  emptyState: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
        color: themeVars.color.backgroundOnSlight,
        paddingLeft: `calc(${themeVars.space[4]} + 28px)`,
      },
    },
  }),
};
