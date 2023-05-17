import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.backgroundOn,
        listStyle: 'none',
        margin: 0,
        padding: `${themeVars.space['4']} 0 ${themeVars.space['4']} ${themeVars.space['6']}`,
        listStyleType: 'disc',
        listStylePosition: 'inside',
      },
    },
  }),
};
