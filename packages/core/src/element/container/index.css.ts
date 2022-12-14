import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../../editor/index.css';
import { themeVars } from '../../theme/index.css';

const root = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'relative',
      margin: `${themeVars.space['4']} 0`,
    },
  },
});

const dropArea = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'absolute',
      right: 0,
      left: 0,
      height: themeVars.space['0'],
    },
  },
});

const dropAreaAbove = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      top: `calc(${themeVars.space['2']} * -1)`,
    },
  },
});

const dropAreaBelow = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      bottom: `calc(${themeVars.space['2']} * -1)`,
    },
  },
});

const dropAreaInner = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'absolute',
      height: themeVars.space['0'],
      backgroundColor: themeVars.color.brand,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      margin: 'auto',
      opacity: 0,
    },
  },
});

const dropAreaInnerDroppable = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      height: themeVars.space['2'],
      opacity: 0.08,
    },
  },
});

const dropAreaInnerOver = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      opacity: 0.5,
    },
  },
});

const body = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'relative',
    },
  },
});
// @see: https://bugzilla.mozilla.org/show_bug.cgi?id=36854
const bodyPatched = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'inline-block',
    },
  },
});

const bodyPlaceholder = style({
  selectors: {
    [`${editorStyles.root} ${body} &`]: {
      display: 'none',
      position: 'absolute',
      top: 0,
      bottom: 0,
      userSelect: 'none',
      pointerEvents: 'none',
      color: themeVars.color.backgroundOnSlight,
    },
  },
});

const bodyPlaceholderShown = style({
  selectors: {
    [`${editorStyles.root} ${body} &`]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
});

const utilsContainer = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
  },
});

const utilsContainerOver = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'block',
    },
  },
});

const utils = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'flex',
      gap: 12,
    },
  },
});

const button = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
      padding: themeVars.space['1'],
      color: themeVars.color.brand,
    },
  },
});

export const styles = {
  root,
  dropArea,
  dropAreaAbove,
  dropAreaBelow,
  dropAreaInner,
  dropAreaInnerDroppable,
  dropAreaInnerOver,
  body,
  bodyPlaceholder,
  bodyPlaceholderShown,
  bodyPatched,
  utilsContainer,
  utilsContainerOver,
  utils,
  button,
};
