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

const dropArea = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      height: themeVars.space['2'],
      backgroundColor: themeVars.color.brand,
      opacity: 0,
    }
  }
});

const dropAreaDroppable = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      opacity: 0.08,
    }
  }
});

const dropAreaOver = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      opacity: 0.5,
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
      padding: themeVars.space['1'],
      color: themeVars.color.brand,
    },
  }
});

export const styles = {
  root, dropArea, dropAreaDroppable, dropAreaOver, body, utilsContainer, utils, button,
};
