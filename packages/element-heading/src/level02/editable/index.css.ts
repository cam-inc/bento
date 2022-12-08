import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        margin: 0,
        fontSize: themeVars.fontSize.heading.medium,
        fontWeight: 'bold',
        color: themeVars.color.backgroundOn,
      },
    },
  })
};
