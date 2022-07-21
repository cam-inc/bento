/* @jsx h */
import { h, createPlugin, PDJSX, useState } from '../../../../dist/lib';
import EditorJS from '@editorjs/editorjs';

const CustomTool = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    console.log('clicked');
    setCount(count + 1);
    console.log(count);
  };
  const handleSave = (blockContent: any) => {
    console.log(blockContent.value);
  };
  const initializer: PDJSX.ToolAttributes['initializer'] = (params) => {
    console.log(params);
  };
  return (
    <tool
      initializer={initializer}
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
      static_get_toolbox={{ title: 'CustomTool', icon: '<span>🔮</span>' }}
    >
      <div>
        <button
          style={{ border: 'none', cursor: 'pointer' }}
          onClick={handleClick}
        >
          button
        </button>
        <div>{count}</div>
      </div>
    </tool>
  );
};

const CustomInlineTool = () => {
  const initializer: PDJSX.InlineToolAttributes['initializer'] = (params) => {
    console.log(params);
  };
  return (
    <inlineTool
      initializer={initializer}
      surround={() => {}}
      checkState={() => {}}
      renderActions={undefined}
      clear={undefined}
      static_get_isInline={true}
      get_shortcut={undefined}
      static_get_sanitize={undefined}
      static_get_title={undefined}
    >
      <div className="inline-tool-container">
        <span className="ce-inline-tool">📝</span>
      </div>
    </inlineTool>
  );
};

const CustomBlockTune = () => {
  const initializer: PDJSX.BlockTuneAttributes['initializer'] = (params) => {
    console.log(params);
  };
  return (
    <blockTune
      initializer={initializer}
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
          {/* test comment */}
          <button>button</button>
          <button>button</button>
          <button>button</button>
          <button>button</button>
          <button>button</button>
        </div>
      </div>
    </blockTune>
  );
};

const customTool = createPlugin(<CustomTool />);
const customInlineTool = createPlugin(<CustomInlineTool />);
const customBlockTune = createPlugin(<CustomBlockTune />);

const e = document.createElement('div');
e.id = 'editorjs';
document.body.appendChild(e);

new EditorJS({
  holder: 'editorjs',
  tools: {
    customTool,
    CustomInlineTool: { class: customInlineTool },
    CustomBlockTune: { class: customBlockTune },
  },
});
