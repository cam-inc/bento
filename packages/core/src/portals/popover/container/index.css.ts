import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../../../editor/index.css';

export const styles = {
  root: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  }),
};
