import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        height: themeVars.space['px'],
        backgroundColor: themeVars.color.backgroundOnSlight,
      }
    },
  })
};
