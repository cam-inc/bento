import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../editor/index.css';
import { themeVars } from '../theme/index.css';

const root = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      width: 260,
      backgroundColor: themeVars.color.surface,
      color: themeVars.color.surfaceOn,
      borderRadius: themeVars.radius.medium,
      border: `1px solid ${themeVars.color.surfaceOnSlight}`,
      overflow: 'hidden',
      boxShadow: themeVars.boxShadow.level['1'],
    },
  },
});

const button = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'currentColor',
      display: 'block',
      width: '100%',
      padding: `${themeVars.space['2']} ${themeVars.space['3']}`,
      position: 'relative',
      cursor: 'pointer',
    },
  },
});

const buttonBG = style({
  selectors: {
    [`${editorStyles.root} ${button}:hover &`]: {
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

const buttonContainer = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: themeVars.space['3'],
    },
  },
});

const buttonIcon = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      width: 32,
      height: 32,
      padding: themeVars.space['2'],
      borderRadius: themeVars.radius.small,
      backgroundColor: themeVars.color.surface,
      color: themeVars.color.brand,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

const buttonTitle = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      color: themeVars.color.surfaceOn,
      fontSize: themeVars.fontSize.label.medium,
    },
  },
});

const list = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
  },
});

export const styles = {
  root,
  button,
  buttonBG,
  buttonContainer,
  buttonIcon,
  buttonTitle,
  list,
};
