import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../editor/index.css';
import { themeVars } from '../theme/index.css';

export const styles = {
  root: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        padding: themeVars.space['2'],
        backgroundColor: themeVars.color.surface,
        color: themeVars.color.surfaceOn,
        borderRadius: themeVars.radius.medium,
        border: `1px solid ${themeVars.color.surfaceOnSlight}`,
        overflow: 'hidden',
      },
    },
  }),
  list: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        display: 'flex',
      },
    },
  }),
  item: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        paddingRight: themeVars.space['3'],
        marginRight: themeVars.space['3'],
        borderRight: `1px solid ${themeVars.color.surfaceOnFaint}`,
      },
      [`${editorStyles.root} &:last-child`]: {
        paddingRight: 0,
        marginRight: 0,
        borderRight: 'none',
      },
    },
  }),
};
