import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  root: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        margin: 0,
        fontSize: themeVars.fontSize.label.large,
        color: themeVars.color.accentXXDOn,
        minWidth: 1,
      },
      [`.${EditorClassName} &:not(:first-child) `]: {
        marginTop: themeVars.space[3],
      },
    },
  }),
};
