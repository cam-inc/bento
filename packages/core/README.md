# @bento-editor/core

## Introduction
Bento is build on top of [Slate](https://docs.slatejs.org/). Bento's primary objective is to provide [Notion](https://www.notion.so/help/writing-and-editing-basics)-like editor using Slate APIs. For Bento having this aim, you'll find Bento similar to Slate and Notion regarding its terminology, function, etc.

To better understand Bento, we highly recommend you to read Slate's documents:
- [Introduction](https://docs.slatejs.org/)
- [Concepts - Nodes](https://docs.slatejs.org/concepts/02-nodes)
- [Concepts - Location](https://docs.slatejs.org/concepts/03-locations)
- [Concepts - Transforms](https://docs.slatejs.org/concepts/04-transforms)

and try out Notion.

## Terminology

### `Editor`
- is a root-level object of Bento.
- is a block-styled editor: composition of block-level and inline-level components.
- takes initial data, configuration, style values such as color and font known as design tokens, and etc.

### `Editable`
is the main UI field to display user-editted data, think it as a canvas on which you edit content.

### `Element`
Though for users who have experience using Notion or Notion-like editors the term `Block` would be their familiar, we stick to using the term `Element` so as to follow [the Slate's definition](https://docs.slatejs.org/concepts/04-transforms). Block and Element are the same, anyway.

### `Text`(, or `Leaf`)
On the same reason we call inline-level components as Text. Because Slate uses the term `Leaf` to, we guess, refer to the same component and we think that's redundant, we stick to using only `Text` in as many situations as possible.

### `Node`
refers to both Element and Text. Read [the first section of this Slate's doc](https://docs.slatejs.org/concepts/02-nodes) to see the difference between them.

### `Attributes`
Each Node has its own set of attributes and their set, or structure, that varies depending on which Node type they are of. One example for an attribute is the `level` attribute of `@bento-editor/element-heading` which is used to set its sectioning level; `level: 1` would be regarded as `<h1 />`, `level: 2` as `<h2 />`, and so on.

### `Package`
is a deliverable parcel which contains a single Node, is to be plugged in to Bento, and can be owned by Bento or you. Examples are Bento-owned packages on the npm registory like [@bento-editor/element-paragraph](https://www.npmjs.com/package/@bento-editor/element-paragraph), and any package you create tailored to your service domain like `element-{Your Service Name}-media` to handle your-service-specific media objects.

### `Toolbox`, `Toolbar` and `Toolmenu`
First of all, please read [Notion's document of 'Writing & editing basics'](https://www.notion.so/help/writing-and-editing-basics#editing-tools) to grab the idea of those tools: Toolbox, Toolbar and Toolmenu.

- **Toolbox**: is a tool for users to add a new Node, usually Element Node, into the next line; similar one that you see on clicking `+` icon on Notion Editor.
- **Toolbar**: is a tool to edit Text Nodes you selected.
- **Toolmenu**: is a tool to editor edit a targeted Element Node, similar one that you see on clicking `⋮⋮` icon on Notion Editor.

## How to Create Your Package
Bento has specific types for Node: `type Element` and `type Text` in this [file](../src/config/index.ts).
Bento restricts all packages, including yours, to follow those types, but they are simple and straight-forward; You'll just need to define some of the characters found on [the Terminology section](./#Terminology) one-by-one :)

You can read their code of [all the Bento-owned packages prefixed with `element-` or `text-`](../) as examples when creating your own package.

## How to Customize Appearance
Though Bento has most of its UI fixed, it allows users to change some of its design tokens by configuring their key-values, like so:
```javascript
import { Editor } from '@bento-editor/core';
const config = {
  themeToken: {
    color: {
      background: 'lightblue',
      backgroundOn: 'darkblue',
    }
  }
};

const YourEditor = () => {
  return (
    <Editor config={config} />
  );
};
```

Remember that Bento doesn't intend to offer full-customizable functions related to design, rather Bento offers you the way to adjust its design to your service UI design by allowing you to change only design tokens like color, space, font size, etc. Read [this](./src/theme) for detail about all the customizable tokens.

Bento watches users' `prefers-color-scheme` CSS media feature and switches design tokens accordingly. Pass token values for both `light` and `dark` modes separately like this:

```javascript
const config = {
  themeToken: {
    color: {
      light: {
        background: 'lightblue',
        backgroundOn: 'darkblue',
      },
      dark: {
        background: 'darkblue',
        backgroundOn: 'lightblue',
      },
    }
  }
};
```
