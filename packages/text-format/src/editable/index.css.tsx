import { style } from '@vanilla-extract/css';
import { /*themeVars,*/ EditorClassName } from '@bento-editor/core';

export const styles = {
  bold: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        fontWeight: 'bold',
      },
    },
  }),
  italic: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        fontStyle: 'italic',
      },
    },
  }),
  strikethrough: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        textDecoration: 'line-through',
      },
    },
  }),
  underline: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        borderBottom: '0.05em solid',
      },
    },
  }),
};
