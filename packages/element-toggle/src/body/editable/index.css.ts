import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  container: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        marginLeft: themeVars.space['9'],
      },
    },
  }),
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        color: themeVars.color.backgroundOnLow,
        fontSize: themeVars.fontSize.label.large,
      },
    },
  }),
};
