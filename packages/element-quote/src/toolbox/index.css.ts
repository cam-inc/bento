import { style } from '@vanilla-extract/css';
import { /*themeVars,*/ EditorClassName } from '@bento-editor/core';

export const styles = {
  thumb: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'block',
        width: '100%',
      },
    },
  }),
};
