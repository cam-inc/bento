import { themeVars } from '@bento-editor/core';
import { style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    boxSizing: 'border-box',
    width: '100%',
    fontSize: `${themeVars.fontSize.label.medium} !important`,
    padding: `${themeVars.space[2]} ${themeVars.space[4]}`,
    backgroundColor: 'inherit',
    borderRadius: themeVars.radius.medium,
    border: `solid 1px ${themeVars.color.backgroundOnSlight}`,
    ':focus': {
      outline: `solid 1px ${themeVars.color.brandOnFaint}`,
      border: `solid 1px ${themeVars.color.brandOnFaint}`,
    },
    '::placeholder': {
      fontSize: `${themeVars.fontSize.label.medium} !important`,
      color: themeVars.color.backgroundOnLow,
    },
  }),
};
