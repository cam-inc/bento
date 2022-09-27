import { themeVars } from '@bento-editor/core';
import { style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    color: themeVars.color.brand,
  }),
  container: style({
    display: 'flex',
    alignItems: 'center',
  }),
  openInNewIcon: style({
    display: 'block',
    width: 14,
    height: 14,
    marginLeft: themeVars.space[2],
  }),
};
