import { themeVars } from '@bento-editor/core';
import { globalStyle, style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    backgroundColor: themeVars.color.backgroundOn,
  }),
};

globalStyle(`${styles.root} > em-emoji-picker`, {
  margin: 0,
});
