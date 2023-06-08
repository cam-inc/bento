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
      },
    },
  }),
  color: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        borderLeft: `solid 1px ${themeVars.color.backgroundOnFaint}`,
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
        height: 32,
        padding: `0 ${themeVars.space[1]}`,
        position: 'relative',
        color: themeVars.color.backgroundOn,
        cursor: 'pointer',
      },
    },
  }),
  icon: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        width: 20,
        height: 20,
        padding: 0,
      },
    },
  }),
  bg: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
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
