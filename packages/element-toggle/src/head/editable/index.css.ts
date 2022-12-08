import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.backgroundOnLow,
        fontSize: themeVars.fontSize.label.large,
        display: 'flex',
        alignItems: 'center',
        gap: themeVars.space['2'],
      },
    },
  }),
  ctrl: style({
    selectors: {
      [`.${EditorClassName} &`]: {
      },
    },
  }),
  opener: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'currentColor',
        backgroundColor: 'transparent',
        padding: 0,
        width: 32,
        height: 32,
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
