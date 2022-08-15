import { style } from '@vanilla-extract/css';

export const styles = {
  root: style({
    pointerEvents: 'auto',
    position: 'absolute',
    width: 0,
    height: 0,
  }),
  content: style({
    padding: '8px',
    border: '1px solid gray',
    overflow: 'scroll',
    overscrollBehavior: 'contain',
  }),
};
