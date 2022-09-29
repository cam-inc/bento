import { globalStyle, style } from '@vanilla-extract/css';
import { EditorClassName } from '../../editor';
import { themeVars } from '../../theme/index.css';

export const styles = {
  root: style({
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding: themeVars.space[4],
    cursor: 'pointer',
    color: 'inherit',
  }),
};

globalStyle(`${EditorClassName} button`, {
  fontWeight: 'bold',
  fontSize: themeVars.fontSize.label.medium,
  padding: `${themeVars.space[2]} ${themeVars.space[4]}`,
  borderRadius: themeVars.radius.full,
});
