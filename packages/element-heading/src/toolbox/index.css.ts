import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  thumb: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.surfaceInverted,
        fontSize: themeVars.fontSize.heading.small,
        fontWeight: 'bold',
      },
    },
  })
};
