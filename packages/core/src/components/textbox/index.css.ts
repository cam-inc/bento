import { themeVars } from '../../theme/index.css';
import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../../editor/index.css';

export const styles = {
  root: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        boxSizing: 'border-box',
        width: '100%',
        padding: `${themeVars.space[2]} ${themeVars.space[4]}`,
        backgroundColor: 'inherit',
        borderRadius: themeVars.radius.medium,
        border: `solid 1px ${themeVars.color.backgroundOnSlight}`,
        fontSize: themeVars.fontSize.label.medium,
      },
      [`${editorStyles.root} &:focus`]: {
        outline: `solid 1px ${themeVars.color.brandOnFaint}`,
        border: `solid 1px ${themeVars.color.brandOnFaint}`,
      },
      [`${editorStyles.root} &:placeholder`]: {
        fontSize: themeVars.fontSize.label.medium,
        color: themeVars.color.backgroundOnLow,
      },
    },
  }),
};
