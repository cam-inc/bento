import { style } from '@vanilla-extract/css';
import { themeVars } from '@bento-editor/core';

export const styles = {
  root: style({
    display: 'flex',
    alignItems: 'center',
    color: themeVars.color.brand,
    width: 'fit-content',
    margin: 0,
  }),
  href: style({
    textDecoration: `underline 0.1em ${themeVars.color.brand}`,
  }),
  openInNewIcon: style({
    display: 'block',
    width: 14,
    height: 14,
    marginLeft: themeVars.space[2],
  }),
};
