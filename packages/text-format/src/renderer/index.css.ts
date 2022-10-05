import { themeVars } from '@bento-editor/core';
import { style } from '@vanilla-extract/css';

export const styles = {
  bold: style({
    fontWeight: 'bold',
  }),
  italic: style({
    fontStyle: 'italic',
  }),
  strikethrough: style({
    textDecoration: 'line-through',
  }),
  underline: style({
    borderBottom: '0.05em solid',
  }),
  inherit: style({
    fontWeight: 'inherit',
    fontStyle: 'inherit',
  }),
  href: style({
    color: themeVars.color.brand,
    textDecoration: `underline 0.1em ${themeVars.color.brand}`,
  }),
};
