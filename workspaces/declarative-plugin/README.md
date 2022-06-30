<div align="center">
  <h1>
    ⚔️  @bento-editor/declarative-plugin ⚔️
  </h1>
  <h3>
    🚜 CURRENTLY IN EARLY DEVELOPMENT 🚜
  </h3>
  <p>
    Breaking changes often may occur
  </p>
  <p>
    <a href="https://codesandbox.io/s/focused-merkle-ky84t5?file=/src/index.tsx">Live Demo</a>
    <span>・</span>
    <a href="https://github.com/shuta13/@bento-editor/declarative-plugin/issues/new">Report Bugs | Request Features</a>
  </p>
</div>

## About @bento-editor/declarative-plugin

Plugin for constructing Editor.js Tools

### motivation

## Getting started

```shell
npm i @editorjs/editorjs @bento-editor/declarative-plugin
```

Strongly recommended to use with TypeScript

```shell
npm i -D typescript
```

## Usage

### With TypeScript

```tsx
/* @jsx h */
import { h, createTool } from "@bento-editor/declarative-plugin";
import type { EditorJSX } from "@bento-editor/declarative-plugin";
import EditorJS from "@editorjs/editorjs";

const CustomTool: EditorJSX.Tool = () => {
  const handleClick = () => {
    console.log("clicked");
  };
  const handleSave: EditorJSX.ToolAttributes<{ value: string }>["save"] = (
    blockContent
  ) => console.log(blockContent.value);
  return (
    <tool
      save={handleSave}
      validate={undefined}
      renderSettings={undefined}
      destory={undefined}
      onPaste={undefined}
      merge={undefined}
      static_get_pasteConfig={undefined}
      static_get_sanitize={undefined}
      static_get_shortcut={undefined}
      static_get_conversionConfig={undefined}
      static_get_enableLineBreaks={undefined}
      static_get_isReadOnlySupported={undefined}
      static_get_toolbox={{ title: "CustomTool", icon: <span>🔮</span> }}
    >
      <div>
        <button onClick={handleClick}>button</button>
      </div>
    </tool>
  );
};

const CustomInlineTool: EditorJSX.InlineTool = () => {
  return (
    <inlineTool
      surround={() => {}}
      checkState={() => {}}
      renderActions={undefined}
      clear={undefined}
      static_get_isInline={true}
      get_shortcut={undefined}
      static_get_sanitize={undefined}
      static_get_title={undefined}
    >
      <div>
        <span>InlineTool</span>
      </div>
    </inlineTool>
  );
};

const CustomBlockTune: EditorJSX.BlockTune = () => {
  return (
    <blockTune
      save={undefined}
      wrap={undefined}
      static_get_isTune={true}
      static_prepare={undefined}
      static_reset={undefined}
    >
      <div>
        <span>BlockTune</span>
        <div>
          <span>nested</span>
        </div>
        <span />
        <div>
          <button>button</button>
        </div>
      </div>
    </blockTune>
  );
};

const customTool = createTool(<CustomTool />, null);
const customInlineTool = createTool(<CustomInlineTool />, null);
const customBlockTune = createTool(<CustomBlockTune />, null);

const e = document.createElement("div");
e.id = "editorjs";
document.body.appendChild(e);

new EditorJS({
  holderId: "editorjs",
  tools: {
    customTool,
    CustomInlineTool: { class: customInlineTool },
    CustomBlockTune: { class: customBlockTune },
  },
});
```

If the `@jsx h` comment is not enabled, you can use @bento-editor/declarative-plugin by modifying `@babel/plugin-transform-react-jsx` pragma or compilerOptions.jsxFactory in tsconfig.json as follows.

### `.babelrc` (with `@babel-transform-react-jsx`)

```json
{
  "plugins": [["transform-react-jsx", { "pragma": "h" }]]
}
```

### `tsconfig.json` (with `tsc`)

```json
{
  "compilerOptions": {
    "jsxFactory": "h"
  }
}
```

## Roadmap

- [x] Add skelton
- [x] Add types for custom JSX elements
- [ ] Add a parser for JSX and syntax of Editor.js tools
  - [x] Prototyping(Add a simple parser)
  - [x] [Styles API support](https://editorjs.io/styles)
  - [ ] [Access params of constructor as props](https://editorjs.io/tools-api#class-constructor)
  - [ ] [JSX as props](https://github.com/shuta13/@bento-editor/declarative-plugin/blob/2152be5020b83c75ac8c0d456a07b2ca5fc260fc/packages/core/src/types.ts#L64)
- [ ] Add unit & integration testing
- [ ] Add implements of diff or reconcile
- [x] Add functions for transforming JSX nodes to plugin class syntax
- [ ] A11y support

## Contributing

```shell
git clone https://github.com/cam-inc/bento.git && cd bento && npm run preflight
```

## License

MIT License

## Contact

## Inspired

- https://github.com/preactjs/preact
<!-- ref. https://github.com/othneildrew/Best-README-Template/blob/master/README.md -->
