import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        fontSize: themeVars.fontSize.heading.small,
        fontWeight: 'bold',
        color: themeVars.color.backgroundOn,
      },
    },
  })
};
