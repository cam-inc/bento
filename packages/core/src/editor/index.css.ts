import { style } from '@vanilla-extract/css';
import { themeVars } from '../theme/index.css';

export const styles = {
  root: style({
    backgroundColor: themeVars.color.background,
    //  fontFamily: vars.font.body,
    position: 'relative',
    padding: themeVars.editor.padding,
  }),
  container: style({
    position: 'relative',
  }),
}
