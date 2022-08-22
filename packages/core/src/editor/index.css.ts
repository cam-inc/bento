import { globalStyle, style } from '@vanilla-extract/css';
import { themeVars } from '../theme/index.css';

export const styles = {
  root: style({
    backgroundColor: themeVars.color.background,
    //  fontFamily: vars.font.body,
    position: 'relative',
    padding: themeVars.space['40'],
  }),
  container: style({
    position: 'relative',
  }),
}

/**
 * Global Styles
 */
// Normalize browsers' default style.
// @see: https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css
globalStyle(`${styles.root} *`, {
  boxSizing: 'border-box',
})
