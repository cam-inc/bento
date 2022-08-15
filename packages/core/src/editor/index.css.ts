import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue',
  },
  font: {
    body: 'arial',
  }
});

export const styles = {
  root: style({
    //  backgroundColor: vars.color.brand,
    //  fontFamily: vars.font.body,
    position: 'relative',
    padding: 10,
  }),
  container: style({
    position: 'relative',
  }),
}
