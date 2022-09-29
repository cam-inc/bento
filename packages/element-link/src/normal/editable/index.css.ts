import { themeVars } from '@bento-editor/core';
import { style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    color: themeVars.color.backgroundOn,
    width: 'fit-content',
  }),
  linkContainer: style({
    position: 'relative',
  }),
  spacer: style({
    position: 'absolute',
    top: themeVars.space[4],
    left: 0,
    width: '100%',
    height: themeVars.space[4],
    cursor: 'pointer',
  }),
  editButton: style({
    position: 'absolute',
    top: themeVars.space[8],
    right: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: `${themeVars.color.surface} !important`,
    border: `solid 1px ${themeVars.color.surfaceOnSlight} !important`,
    borderRadius: `${themeVars.radius.medium} !important`,
    padding: `${themeVars.space[4]} !important`,
    whiteSpace: 'nowrap',
    width: 'auto',
  }),
  editIcon: style({
    display: 'block',
    width: 18,
    height: 18,
    marginRight: themeVars.space[4],
  }),
};
