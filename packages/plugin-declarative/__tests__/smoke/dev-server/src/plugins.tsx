/* @jsx h */
import { h, createPlugin, PDJSX, useState } from '../../../../dist/lib';
import EditorJS from '@editorjs/editorjs';

const CustomTool = () => {
  const handleClick = () => {
    console.log('clicked');
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
      </div>
    </tool>
  );
};

const SampleWithHooks = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Hello');
  const handleClick = () => {
    setShow(!show);
  };
  const handleChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      setText(e.target.value);
    }
  };
  return (
    <tool
      save={() => {}}
      static_get_toolbox={{ title: 'SampleWithHooks', icon: '<span>🧪</span>' }}
    >
      <div style={{ position: 'relative' }}>
        <span onClick={handleClick}>{text}</span>
        {show && (
          <div
            style={{
              position: 'absolute',
              width: '128px',
              height: '64px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'gray',
              color: 'white',
            }}
          >
            <form style={{ width: '100%', padding: '8px' }}>
              <input style={{ width: '100%' }} onChange={handleChange} />
            </form>
          </div>
        )}
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
const sampleWithHooks = createPlugin(<SampleWithHooks />);
const customInlineTool = createPlugin(<CustomInlineTool />);
const customBlockTune = createPlugin(<CustomBlockTune />);

const e = document.createElement('div');
e.id = 'editorjs';
document.body.appendChild(e);

new EditorJS({
  holder: 'editorjs',
  tools: {
    customTool,
    sampleWithHooks,
    CustomInlineTool: { class: customInlineTool },
    CustomBlockTune: { class: customBlockTune },
  },
});
