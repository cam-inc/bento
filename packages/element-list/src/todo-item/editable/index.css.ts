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
  placeholder: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        paddingLeft: `calc(${themeVars.space[6]} + 3px)`,
        whiteSpace: 'pre',
      },
    },
  }),
};
