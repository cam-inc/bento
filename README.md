# bento

Bento is a react library for Notion-like block-style editor build on top of [Slate](https://github.com/ianstormtaylor/slate).

## Packages
- core
- heading
- paragraph
- and more!

## Quick Start

### Install Packages
```sh
# you always need to install the core package.
$ npm install --save @bento-editor/core

# install packages you use for your editor.
$ npm install --save @bento-editor/element-heading
$ npm install --save @bento-editor/element-paragraph
$ npm install --save @bento-editor/text-format
```

### Configure

```tsx
import { Editor } from '@bento-editor/core';
import elementHeading from '@bento-editor/element-heading';
import elementParagraph from '@bento-editor/element-paragraph';
import textFormat from '@bento-editor/text-format';

const YourEditor = () => {

  const config = {
    // element-type nodes
    elements: [
      elementParagraph,
      elementHeading
    ],
    // text-type nodes
    texts: [
      textFormat
    ],
    // customize appearance
    themeToken: {
      color: {
        background: 'darkblue',
        backgroundOn: 'lightblue',
      }
    },
  };

  // Pass initial data to Bento.
  const initialValue = [
    {
      type: 'heading',
      attributes: {
        level: 1,
      },
      children: [
        {
          type: 'format',
          text: 'This is a heading.'
        }
      ]
    }
  ];

  const handleChange = (value) => {
    // You get latest data editted through Bento.
    console.log(value);
  };

  return (
    <Editor
      config={config}
      initialValue={initialValue}
      onChange={handleChange}
    />
  );
};
```

### Styles

Each package contains its style.

```
import '@bento-editor/core/styles';
import '@bento-editor/element-heading/styles';
import '@bento-editor/element-paragraph/styles';
import '@bento-editor/text-format/styles';
```
