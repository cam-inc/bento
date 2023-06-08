import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../editor/index.css';
import { themeVars } from '../theme/index.css';

const root = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      backgroundColor: themeVars.color.surface,
      color: themeVars.color.surfaceOn,
      borderRadius: themeVars.radius.medium,
      border: `1px solid ${themeVars.color.surfaceOnSlight}`,
      overflow: 'hidden',
      boxShadow: themeVars.boxShadow.level['1'],
    },
  },
});
const list = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
  },
});

const item = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      borderRight: `1px solid ${themeVars.color.surfaceOnFaint}`,
    },
    [`${editorStyles.root} &:last-child`]: {
      paddingRight: 0,
      marginRight: 0,
      borderRight: 'none',
    },
  },
});

const buttonBox = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'currentColor',
      padding: 0,
      display: 'flex',
      placeItems: 'center',
      position: 'relative',
      fontSize: themeVars.fontSize.label.small,
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      height: 32,
      paddingLeft: themeVars.space[1],
      paddingRight: themeVars.space[1],
    },
    [`${editorStyles.root} ${list} ${item}:first-child &`]: {
      paddingLeft: themeVars.space[1.5],
    },
  },
});

const featureIcon = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'flex',
      placeItems: 'center',
      width: 20,
      height: 20,
      color: themeVars.color.brand,
      marginRight: themeVars.space[0.5],
    },
  },
});

const dropDownIcon = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'block',
      width: 20,
      height: 20,
      color: themeVars.color.backgroundOnSlight,
    },
  },
});

const moreButton = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'currentColor',
      display: 'flex',
      placeItems: 'center',
      padding: 0,
      height: 32,
      position: 'relative',
      color: themeVars.color.backgroundOnSlight,
      cursor: 'pointer',
      paddingLeft: themeVars.space[1],
      paddingRight: themeVars.space[1.5],
    },
  },
});

const moreButtonIcon = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      width: 20,
      height: 20,
      padding: 0,
    },
  },
});

const bg = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    [`${editorStyles.root} &:hover`]: {
      backgroundColor: themeVars.color.brand,
      opacity: themeVars.opacity.hover,
    },
    [`${editorStyles.root} &:active`]: {
      backgroundColor: themeVars.color.brand,
      opacity: themeVars.opacity.active,
    },
  },
});

export const styles = {
  root,
  list,
  item,
  buttonBox,
  featureIcon,
  dropDownIcon,
  moreButton,
  moreButtonIcon,
  bg,
};
