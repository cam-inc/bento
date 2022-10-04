import { themeVars, EditorClassName } from '@bento-editor/core';
import { globalStyle, style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    color: themeVars.color.backgroundOn,
    width: 'fit-content',
  }),
  spacer: style({
    width: '100%',
    height: themeVars.space[4],
    cursor: 'pointer',
    maxWidth: 108,
  }),
  editButton: style({
    selectors: {
      [`.${EditorClassName} &`]: {
        display: 'flex',
        justifyContent: 'right',
        flexWrap: 'wrap',
        placeItems: 'flex-end',
        backgroundColor: themeVars.color.surface,
        whiteSpace: 'nowrap',
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
  padding: themeVars.space[4],
});
