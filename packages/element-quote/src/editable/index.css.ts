import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        paddingLeft: themeVars.space['3'],
        borderLeft: `${themeVars.space['0.5']} solid ${themeVars.color.backgroundOnLow}`,
      },
    },
  }),
  blockquote: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.backgroundOnLow,
        fontSize: themeVars.fontSize.label.large,
      },
    },
  }),
  cite: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        marginTop: themeVars.space['3'],
      },
    },
  }),
  input: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'currentColor',
        backgroundColor: 'transparent',
        padding: 0,
        color: themeVars.color.backgroundOnLow,
        fontSize: themeVars.fontSize.label.small,
      },
    },
  }),
  emptyState: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        position: 'absolute',
        top: 0,
        userSelect: 'none',
        pointerEvents: 'none',
        color: themeVars.color.backgroundOnSlight,
        paddingLeft: themeVars.space['4'],
      },
    },
  }),
};
