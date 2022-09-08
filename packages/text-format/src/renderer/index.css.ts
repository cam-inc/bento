import { style } from '@vanilla-extract/css';

export const styles = {
  bold: style({
    fontWeight: 'bold',
  }),
  italic: style({
    fontStyle: 'italic',
  }),
  strikethrough: style({
    textDecoration: 'line-through',
  }),
  underline: style({
    textDecoration: 'underline',
  }),
  inherit: style({
    fontWeight: 'inherit',
    fontStyle: 'inherit',
  }),
};
