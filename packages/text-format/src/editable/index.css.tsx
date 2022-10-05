import { style } from '@vanilla-extract/css';
import { /*themeVars,*/ EditorClassName, themeVars } from '@bento-editor/core';

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
  href: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.brand,
        borderBottom: `solid 0.1em ${themeVars.color.brand}`,
      },
    },
  }),
};
