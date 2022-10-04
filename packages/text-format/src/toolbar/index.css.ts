import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  list: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'flex',
      },
    },
  }),
  button: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'block',
        width: 20,
        height: 20,
      },
    },
  }),
  buttonBox: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'flex',
        placeItems: 'center',
        fontSize: themeVars.fontSize.label.medium,
        whiteSpace: 'nowrap',
      },
    },
  }),
  featureIcon: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'block',
        width: 20,
        height: 20,
        color: themeVars.color.brand,
        marginRight: themeVars.space[1],
      },
    },
  }),
  dropDownIcon: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'block',
        width: 20,
        height: 20,
        color: themeVars.color.backgroundOnSlight,
        marginLeft: themeVars.space[1],
      },
    },
  }),
  moreButton: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'block',
        width: 20,
        height: 20,
        color: themeVars.color.backgroundOnSlight,
      },
    },
  }),
  verticalRuler: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        width: '1px',
        backgroundColor: themeVars.color.backgroundOnFaint,
        height: '100%',
        margin: `0 ${themeVars.space[2]}`,
      },
    },
  }),
};
