import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../../editor/index.css';
import { themeVars } from '../../theme/index.css';

const root = style({
  padding: 0,
  backgroundColor: 'transparent',
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: 'currentColor',
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'block',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
    },
  },
});

const rootRadiusSmall = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      borderRadius: themeVars.radius.small,
    },
  },
});

const rootRadiusMedium = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      borderRadius: themeVars.radius.medium,
    },
  },
});

const rootRadiusFull = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      borderRadius: themeVars.radius.full,
    },
  },
});

const bg = style({
  selectors: {
    [`${editorStyles.root} ${root}:hover &`]: {
      backgroundColor: themeVars.color.brand,
      opacity: 0.08,
    },
    [`${editorStyles.root} &`]: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
});

const container = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'relative',
    },
  },
});

const disabled = style({
  cursor: 'not-allowed',
  selectors: {
    [`${editorStyles.root} &`]: {
      color: themeVars.color.backgroundOnSlight,
      backgroundColor: themeVars.color.backgroundOnFaint,
    },
  },
});

export const styles = {
  root,
  rootRadiusSmall,
  rootRadiusMedium,
  rootRadiusFull,
  bg,
  container,
  disabled,
};
