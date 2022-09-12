import { globalStyle, style } from '@vanilla-extract/css';
import { themeVars } from '../theme/index.css';

export const styles = {
  root: style({
    backgroundColor: themeVars.color.background,
    //  fontFamily: vars.font.body,
    position: 'relative',
    padding: themeVars.space['40'],
  }),
  container: style({
    position: 'relative',
  }),
}

/**
 * Global Styles
 * Normalize browsers' default style.
 * goal: to mimic Tailwindcss's set of base styles.
 * @see: https://tailwindcss.com/docs/preflight
 * @see: https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css
 */


// Mimic Modern Normalizer
// @see: https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css

/*
Document
========
*/

/**
Use a better box model (opinionated).
*/

/*
*,
::before,
::after
*/
globalStyle(`
${styles.root} *,
${styles.root} ::before,
${styles.root} ::after`, {
  boxSizing: 'border-box'
});

/**
1. Correct the line height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size (opinionated).
*/

/*
html
*/
globalStyle(`
${styles.root}
`, {
  lineHeight: 1.15, /* 1 */
  WebkitTextSizeAdjust: '100%', /* 2 */
  MozTabSize: 4, /* 3 */
  tabSize: 4, /* 3 */
})

/*
Sections
========
*/

/**
1. Remove the margin in all browsers.
2. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
*/

/*
body
*/
globalStyle(`
${styles.root}
`, {
  margin: 0, /* 1 */
  fontFamily: `
    system-ui,
    -apple-system,
   'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji'` /* 2 */
});

/*
Grouping content
================
*/

/**
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
*/

/*
hr
*/
globalStyle(`
${styles.root} hr
`, {
  height: 0, /* 1 */
  color: 'inherit', /* 2 */
})

/*
Text-level semantics
====================
*/

/**
Add the correct text decoration in Chrome, Edge, and Safari.
*/

/*
abbr[title]
*/
globalStyle(`
${styles.root} abbr[title]
`, {
  textDecoration: 'underline dotted',
})

/**
Add the correct font weight in Edge and Safari.
*/

/*
b,
strong
*/
globalStyle(`
${styles.root} b,
${styles.root} strong
`, {
  fontWeight: 'bolder',
})

/**
1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
2. Correct the odd 'em' font sizing in all browsers.
*/

/*
code,
kbd,
samp,
pre
*/
globalStyle(`
${styles.root}code,
${styles.root} kbd,
${styles.root} samp,
${styles.root} pre
`, {
  fontFamily: `
    ui-monospace,
    SFMono-Regular,
    Consolas,
    'Liberation Mono',
    Menlo,
    monospace
  `,/* 1 */
  fontSize: '1em', /* 2 */
});

/**
Add the correct font size in all browsers.
*/

/*
small
*/
globalStyle(`
${styles.root} small
`, {
  fontSize: '80%',
});

/**
Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
*/

/*
sub,
sup
*/
globalStyle(`
${styles.root} sub,
${styles.root} sup
`, {
  fontSize: '75%',
  lineHeight: 0,
  position: 'relative',
  verticalAlign: 'baseline',
});

/*
sub
*/
globalStyle(`
${styles.root} sub
`, {
  bottom: '-0.25em',
});


/*
sup
*/
globalStyle(`
${styles.root} sup
`, {
  top: '-0.5em',
});

/*
Tabular data
============
*/

/**
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
*/

/*
table
*/
globalStyle(`
${styles.root} table
`, {
  textIndent: 0, /* 1 */
  borderColor: 'inherit', /* 2 */
});

/*
Forms
=====
*/

/**
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
*/

/*
button,
input,
optgroup,
select,
textarea
*/
globalStyle(`
${styles.root} button,
${styles.root} input,
${styles.root} optgroup,
${styles.root} select,
${styles.root} textarea
`, {
  fontFamily: 'inherit', /* 1 */
  fontSize: '100%', /* 1 */
  lineHeight: 1.15, /* 1 */
  margin: 0, /* 2 */
});

/**
Remove the inheritance of text transform in Edge and Firefox.
*/

/*
button,
select
*/
globalStyle(`
${styles.root} button,
${styles.root} select
`, {
  textTransform: 'none',
});

/**
Correct the inability to style clickable types in iOS and Safari.
*/

/*
button,
[type='button'],
[type='reset'],
[type='submit']
*/
globalStyle(`
${styles.root} button,
${styles.root} [type='button'],
${styles.root} [type='reset'],
${styles.root} [type='submit']
`, {
  WebkitAppearance: 'button',
});

/**
Remove the inner border and padding in Firefox.
*/

/*
::-moz-focus-inner
*/
globalStyle(`
${styles.root} ::-moz-focus-inner
`, {
  borderStyle: 'none',
  padding: 0,
});

/**
Restore the focus styles unset by the previous rule.
*/

/*
:-moz-focusring
*/
globalStyle(`
${styles.root} :-moz-focusring
`, {
  outline: '1px dotted ButtonText',
});

/**
Remove the additional ':invalid' styles in Firefox.
See: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737
*/

/*
:-moz-ui-invalid
*/
globalStyle(`
${styles.root} :-moz-ui-invalid
`, {
  boxShadow: 'none',
})

/**
Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
*/

/*
legend
*/
globalStyle(`
${styles.root} legend
`, {
  padding: 0,
});

/**
Add the correct vertical alignment in Chrome and Firefox.
*/

/*
progress
*/
globalStyle(`
${styles.root} progress
`, {
  verticalAlign: 'baseline',
});

/**
Correct the cursor style of increment and decrement buttons in Safari.
*/

/*
::-webkit-inner-spin-button,
::-webkit-outer-spin-button
*/
globalStyle(`
${styles.root} ::-webkit-inner-spin-button,
${styles.root} ::-webkit-outer-spin-button
`, {
  height: 'auto',
});

/**
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

/*
[type='search']
*/
globalStyle(`
${styles.root} [type='search']
`, {
  WebkitAppearance: 'textfield', /* 1 */
  outlineOffset: '-2px', /* 2 */
});

/**
Remove the inner padding in Chrome and Safari on macOS.
*/

/*
::-webkit-search-decoration
*/
globalStyle(`
${styles.root} ::-webkit-search-decoration
`, {
  WebkitAppearance: 'none',
});

/**
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to 'inherit' in Safari.
*/

/*
::-webkit-file-upload-button
*/
globalStyle(`
${styles.root} ::-webkit-file-upload-button
`, {
  WebkitAppearance: 'button', /* 1 */
  font: 'inherit', /* 2 */
})

/*
Interactive
===========
*/

/*
Add the correct display in Chrome and Safari.
*/

/*
summary
*/
globalStyle(`
${styles.root} summary
`, {
  display: 'list-item',
});

// Mimic Tailwindcss's preflight
// @see: https://tailwindcss.com/docs/preflight

// @see: https://tailwindcss.com/docs/preflight#default-margins-are-removed
/*
blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre
*/
globalStyle(`
${styles.root} blockquote,
${styles.root} dl,
${styles.root} dd,
${styles.root} h1,
${styles.root} h2,
${styles.root} h3,
${styles.root} h4,
${styles.root} h5,
${styles.root} h6,
${styles.root} hr,
${styles.root} figure,
${styles.root} p,
${styles.root} pre
`, {
  margin: 0,
});

// @see: https://tailwindcss.com/docs/preflight#headings-are-unstyled
/*
h1,
h2,
h3,
h4,
h5,
h6
*/
globalStyle(`
${styles.root} h1,
${styles.root} h2,
${styles.root} h3,
${styles.root} h4,
${styles.root} h5,
${styles.root} h6
`, {
  fontSize: 'inherit',
  fontWeight: 'inherit',
});

// @see: https://tailwindcss.com/docs/preflight#lists-are-unstyled
/*
ol,
ul
*/
globalStyle(`
${styles.root} ol,
${styles.root} ul
`, {
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

// @see: https://tailwindcss.com/docs/preflight#images-are-block-level
/*
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object
*/
globalStyle(`
${styles.root} img,
${styles.root} svg,
${styles.root} video,
${styles.root} canvas,
${styles.root} audio,
${styles.root} iframe,
${styles.root} embed,
${styles.root} object
`, {
  display: 'block',
  verticalAlign: 'middle',
});

// @see: https://tailwindcss.com/docs/preflight#border-styles-are-reset-globally
/*
*,
::before,
::after
*/
globalStyle(`
${styles.root} *,
${styles.root} ::before,
${styles.root} ::after
`, {
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: 'currentColor',
});

// @see: https://tailwindcss.com/docs/preflight#buttons-have-a-default-outline
/*
button:focus
*/
globalStyle(`
${styles.root} button:focus
`, {
  outline: '1px dotted',
  //outline: '5px auto -webkit-focus-ring-color',
});

// Bento Specific Normalizer
globalStyle(`
${styles.root} button
`, {
  backgroundColor: 'transparent',
  padding: 0,
});
