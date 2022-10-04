import { themeVars } from '@bento-editor/core';
import { style } from '@vanilla-extract/css';

export const styles = {
  card: style({
    display: 'block',
    color: themeVars.color.backgroundOn,
    border: `solid 1px ${themeVars.color.backgroundOnSlight}`,
    borderRadius: themeVars.radius.medium,
    padding: themeVars.space[4],
    maxWidth: 366,
  }),
  title: style({
    marginBottom: themeVars.space[4],
  }),
};
