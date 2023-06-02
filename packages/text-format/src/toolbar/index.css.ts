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
        marginRight: themeVars.space[1],
        paddingRight: themeVars.space[1],
      },
    },
  }),
  color: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        borderLeft: `solid 1px ${themeVars.color.backgroundOnFaint}`,
        marginLeft: themeVars.space[1],
        paddingLeft: themeVars.space[1],
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
        position: 'relative',
        color: themeVars.color.backgroundOn,
        marginRight: themeVars.space[1],
        cursor: 'pointer',
      },
    },
  }),
  bg: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        position: 'absolute',
        top: `calc(${themeVars.space['1.5']} * -1)`,
        right: 0,
        bottom: `calc(${themeVars.space['1.5']} * -1.2)`,
        left: 0,
      },
      [`.${EditorClassName} &:hover`]: {
        backgroundColor: themeVars.color.brand,
        opacity: themeVars.opacity.hover,
      },
      [`.${EditorClassName} &:active`]: {
        backgroundColor: themeVars.color.brand,
        opacity: themeVars.opacity.active,
      },
    },
  }),
};
