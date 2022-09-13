import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../../editor/index.css';
import { themeVars } from '../../theme/index.css';

const root = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'relative',
      marginBottom: themeVars.space['2'],
    }
  }
});

const body = style({});

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
    [`${editorStyles.root} ${root}:hover &`]: {
      display: 'block',
    }
  }
});

const utils = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'flex',
      gap: 12,
    }
  }
});

const button = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
      padding: themeVars.space['1'],
    },
  }
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
      borderRadius: themeVars.radius.small,
    },
  }
});

const buttonIcon = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      flex: '1 1 auto',
      color: themeVars.color.brand,
    }
  }
});

export const styles = {
  root, body, utilsContainer, utils, button, buttonBG, buttonIcon
};
