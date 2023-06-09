import { style } from '@vanilla-extract/css';
import { themeVars, EditorClassName } from '@bento-editor/core';

const list = style({
  selectors: {
    [`.${EditorClassName} &`]: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
    },
  },
});

const link = style({
  selectors: {
    [`.${EditorClassName} &`]: {
      borderRight: `solid 1px ${themeVars.color.backgroundOnFaint}`,
    },
  },
});

const color = style({
  selectors: {
    [`.${EditorClassName} &`]: {
      borderLeft: `solid 1px ${themeVars.color.backgroundOnFaint}`,
    },
  },
});

const button = style({
  selectors: {
    [`.${EditorClassName} &`]: {
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'currentColor',
      backgroundColor: 'transparent',
      display: 'flex',
      placeItems: 'center',
      height: 32,
      padding: `0 ${themeVars.space[0.5]}`,
      position: 'relative',
      color: themeVars.color.backgroundOn,
      cursor: 'pointer',
    },
    [`.${EditorClassName} ${list} li:nth-child(2) &`]: {
      paddingLeft: 4,
    },
    [`.${EditorClassName} ${list} li:nth-last-child(2) &`]: {
      paddingRight: 4,
    },
  },
});

const icon = style({
  selectors: {
    [`.${EditorClassName} &`]: {
      width: 20,
      height: 20,
      padding: 0,
      margin: 'auto',
    },
  },
});

const bg = style({
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
});

export const styles = {
  list,
  link,
  color,
  button,
  icon,
  bg,
};
