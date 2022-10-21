import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.backgroundOn,
        paddingLeft: 24,
        listStyleType: 'disc',
        listStylePosition: 'inside',
      },
    },
  })
};
