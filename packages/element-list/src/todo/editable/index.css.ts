import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    position: 'relative',
    selectors: {
      [`.${EditorClassName} &`]: {
        listStyle: 'none',
        margin: 0,
        color: themeVars.color.backgroundOn,
        padding: `${themeVars.space['4']} 0 ${themeVars.space['4']} ${themeVars.space['6']}`,
      },
    },
  }),
};
