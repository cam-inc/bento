import { style } from '@vanilla-extract/css';
import { themeVars } from '@bento-editor/core';

export const styles = {
  root: style({
    color: themeVars.color.backgroundOn,
    display: 'flex',
  }),
  checkbox: style({
    display: 'block',
    width: 18,
    height: 18,
  }),
};
