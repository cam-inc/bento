import { themeVars } from '@bento-editor/core';
import { style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    backgroundColor: themeVars.color.accentXXD90,
    display: 'flex',
    padding: `${themeVars.space[4]} ${themeVars.space[2]}`,
    color: themeVars.color.surfaceInvertedOnSlight,
  }),
  exclamationIcon: style({
    display: 'block',
    width: 20,
    height: 20,
    margin: `0 ${themeVars.space[2]}`,
  }),
};