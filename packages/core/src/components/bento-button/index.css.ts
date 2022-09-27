import { style } from '@vanilla-extract/css';
import { themeVars } from '../../theme/index.css';

export const styles = {
  root: style({
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: themeVars.radius.full,
    padding: themeVars.space[4],
    cursor: 'pointer',
    color: 'inherit',
  }),
};
