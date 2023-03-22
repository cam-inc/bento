import { themeVars } from '@bento-editor/core';
import { globalStyle, style } from '@vanilla-extract/css';

const contentWrapper = style({
  position: 'relative',
});

const root = style({
  color: themeVars.color.backgroundOn,
  width: 'fit-content',
});

const editButton = style({
  display: 'none',
  backgroundColor: themeVars.color.surface,
  zIndex: 10,
  selectors: {
    [`${contentWrapper}:hover &`]: {
      position: 'absolute',
      right: 0,
      display: 'flex',
      justifyContent: 'right',
      flexWrap: 'wrap',
      placeItems: 'flex-end',
      whiteSpace: 'nowrap',
    },
  },
});

const editIcon = style({
  display: 'block',
  width: 18,
  height: 18,
  marginRight: themeVars.space[4],
});

globalStyle(`${editButton} button`, {
  marginLeft: 'auto',
  maxWidth: 108,
  border: `solid 1px ${themeVars.color.surfaceOnSlight}`,
  borderRadius: themeVars.radius.medium,
});

globalStyle(`${editButton} button > div`, {
  display: 'flex',
  alignItems: 'center',
  padding: themeVars.space[3],
});

export const styles = {
  root,
  contentWrapper,
  editButton,
  editIcon,
};
