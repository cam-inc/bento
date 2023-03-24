import { EditorClassName, themeVars } from '@bento-editor/core';
import { globalStyle, style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    color: themeVars.color.backgroundOn,
    width: 'fit-content',
    position: 'relative',
  }),
  spacer: style({
    width: '100%',
    height: themeVars.space[2],
    cursor: 'pointer',
    maxWidth: 108,
  }),
  editButton: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        backgroundColor: themeVars.color.surface,
        zIndex: themeVars.zIndex.elementUtil,
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        right: 0,
      },
    },
  }),
  editIcon: style({
    display: 'block',
    width: 18,
    height: 18,
    marginRight: themeVars.space[4],
  }),
};

globalStyle(`${styles.editButton} button`, {
  marginLeft: 'auto',
  maxWidth: 108,
  border: `solid 1px ${themeVars.color.surfaceOnSlight}`,
  borderRadius: themeVars.radius.medium,
});

globalStyle(`${styles.editButton} button > div`, {
  display: 'flex',
  alignItems: 'center',
  padding: themeVars.space[3],
});
