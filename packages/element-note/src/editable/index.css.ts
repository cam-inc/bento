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
      }
    }
  }),
};
