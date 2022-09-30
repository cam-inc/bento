import { style } from '@vanilla-extract/css';
import { themeVars } from '../../theme/index.css';

export const styles = {
  root: style({
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    color: 'inherit',
    fontWeight: 'bold',
    fontSize: `${themeVars.fontSize.label.medium} !important`,
    padding: `${themeVars.space[2]} ${themeVars.space[4]} !important`,
    borderRadius: themeVars.radius.full,
  }),
};
