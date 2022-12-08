import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

export const styles = {
  list: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
      },
    },
  }),
  link: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        borderRight: `solid 1px ${themeVars.color.backgroundOnFaint}`,
        marginRight: themeVars.space[3],
        paddingRight: themeVars.space[3],
      },
    },
  }),
  color: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        borderLeft: `solid 1px ${themeVars.color.backgroundOnFaint}`,
        marginLeft: themeVars.space[3],
        paddingLeft: themeVars.space[3],
      },
    },
  }),
  button: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'currentColor',
        backgroundColor: 'transparent',
        display: 'block',
        width: 20,
        height: 20,
        padding: 0,
        color: themeVars.color.backgroundOn,
        marginRight: themeVars.space[3],
      },
    },
  }),
};
