import { globalStyle, style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../../editor/index.css';

export const styles = {
  root: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        position: 'absolute',
        width: 0,
        height: 0,
      },
    },
  }),
  contentWrapper: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        position: 'absolute',
      },
    },
  }),
  content: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        height: '100%',
        display: 'flex',
      },
    },
  }),
  contentAlignStart: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        alignItems: 'flex-start',
      },
    },
  }),
  contentAlignCenter: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        alignItems: 'center',
      },
    },
  }),
  contentAlignEnd: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        alignItems: 'flex-end',
      },
    },
  }),
  contentJustifyCenter: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        justifyContent: 'center',
      },
    },
  }),
  contentJustifyEnd: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        justifyContent: 'flex-end',
      },
    },
  }),
};

globalStyle(`${styles.content} > *`, {
  pointerEvents: 'auto',
});
