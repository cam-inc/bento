import { style } from '@vanilla-extract/css';
import { styles as editorStyles } from '../editor/index.css';
import { themeVars } from '../theme/index.css';

const root = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      width: 260,
      backgroundColor: themeVars.color.surface,
      color: themeVars.color.surfaceOn,
      borderRadius: themeVars.radius.medium,
      border: `1px solid ${themeVars.color.surfaceOnSlight}`,
      overflow: 'hidden',
    }
  }
});

const search = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'relative',
      padding: themeVars.space['2'],
    }
  }
});

const searchIcon = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      position: 'absolute',
      width: 20,
      height: 20,
      margin: 'auto',
      top: 0,
      bottom: 0,
      left: themeVars.space['4'],
      color: themeVars.color.brand,
    }
  }
});

const searchInput = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'block',
      width: '100%',
      border: `1px solid ${themeVars.color.surfaceOnSlight}`,
      borderRadius: themeVars.radius.small,
      padding: `${themeVars.space['2']} ${themeVars.space['2']} ${themeVars.space['2']} ${themeVars.space['9']}`,
    }
  }
});

const itemContainer = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: themeVars.space['3'],
      padding: `${themeVars.space['2']} ${themeVars.space['3']}`,
    }
  }
});

const itemIcon = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      width: 32,
      height: 32,
      padding: themeVars.space['2'],
      borderRadius: themeVars.radius.small,
      backgroundColor: themeVars.color.surface,
      color: themeVars.color.brand,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }
});

const itemTitle = style({
  selectors: {
    [`${editorStyles.root} &`]: {
      color: themeVars.color.surfaceOn,
      fontSize: themeVars.fontSize.label.medium,
    }
  }
});

export const styles = {
  root,
  search,
  searchIcon,
  searchInput,
  itemContainer,
  itemIcon,
  itemTitle,
};
