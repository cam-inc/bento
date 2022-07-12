/* @jsx h */
const {
  h,
  createPlugin
} = require("../../../dist/lib");

const EditorJS = require("@editorjs/editorjs");

const CustomTool = () => {
  const handleClick = () => {
    console.log("clicked");
  };

  const handleSave = blockContent => console.log(blockContent.value);

  return h("tool", {
    save: handleSave,
    validate: undefined,
    renderSettings: undefined,
    destory: undefined,
    onPaste: undefined,
    merge: undefined,
    static_get_pasteConfig: undefined,
    static_get_sanitize: undefined,
    static_get_shortcut: undefined,
    static_get_conversionConfig: undefined,
    static_get_enableLineBreaks: undefined,
    static_get_isReadOnlySupported: undefined,
    static_get_toolbox: {
      title: "CustomTool",
      icon: "<span>🔮</span>"
    }
  }, h("div", null, h("button", {
    style: {
      border: "none",
      cursor: "pointer"
    },
    onClick: handleClick
  }, "button")));
};

const CustomInlineTool = () => {
  return h("inlineTool", {
    surround: () => {},
    checkState: () => {},
    renderActions: undefined,
    clear: undefined,
    static_get_isInline: true,
    get_shortcut: undefined,
    static_get_sanitize: undefined,
    static_get_title: undefined
  }, h("div", {
    className: "inline-tool-container"
  }, h("span", {
    className: "ce-inline-tool"
  }, "\uD83D\uDCDD")));
};

const CustomBlockTune = () => {
  return h("blockTune", {
    save: undefined,
    wrap: undefined,
    static_get_isTune: true,
    static_prepare: undefined,
    static_reset: undefined
  }, h("div", null, h("span", null, "BlockTune"), h("div", null, h("span", null, "nested")), h("span", null), h("div", null, h("button", null, "button"), " ", h("button", null, "button"), " ", h("button", null, "button"), " ", h("button", null, "button"), " ", h("button", null, "button"), " ")));
};

const customTool = createPlugin(h(CustomTool, null));
const customInlineTool = createPlugin(h(CustomInlineTool, null));
const customBlockTune = createPlugin(h(CustomBlockTune, null));
const e = document.createElement("div");
e.id = "editorjs";
document.body.appendChild(e);
new EditorJS({
  holder: "editorjs",
  tools: {
    customTool,
    CustomInlineTool: {
      class: customInlineTool
    },
    CustomBlockTune: {
      class: customBlockTune
    }
  }
});