import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../../editor/index.css';

export const styles = {
  root: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        position: 'relative',
      }
    }
  }),
  body: style({}),
  utilsContainer: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      }
    }
  }),
  utils: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        gap: 12,
      }
    }
  }),
  button: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
        height: 24,
      }
    }
  }),
}
