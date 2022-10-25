import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    position: 'relative',
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.backgroundOn,
        paddingLeft: 24,
        listStyleType: 'decimal',
        listStylePosition: 'inside',
      },
    },
  }),
};
