import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../../editor/index.css';
import { themeVars } from '../../theme/index.css';

export const styles = {
  root: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        width: 254,
        backgroundColor: themeVars.color.surfaceInverted,
        borderRadius: themeVars.radius.medium,
        padding: themeVars.space['2'],
      }
    }
  }),
  thumb: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 136,
        padding: themeVars.space['2'],
        backgroundColor: themeVars.color.surfaceInvertedOnHigh,
        borderRadius: themeVars.radius.medium,
        marginBottom: themeVars.space['3'],
      }
    }
  }),
  title: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        color: themeVars.color.surfaceInvertedOnHigh,
        fontSize: themeVars.fontSize.label.large,
        fontWeight: 'bold',
        marginBottom: themeVars.space['2'],
      }
    }
  }),
  description: style({
    selectors: {
      [`${editorStyles.root} &`]: {
        color: themeVars.color.surfaceInvertedOn,
        fontSize: themeVars.fontSize.label.medium,
      }
    }
  }),
};
