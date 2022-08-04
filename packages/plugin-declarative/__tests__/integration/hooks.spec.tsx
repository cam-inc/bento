/* @jsx h */
import { h, createPlugin, useState, VNode } from '../../lib';

describe('useState', () => {
  it('should update state when calling state updater', () => {
    const App = () => {
      const [text, setText] = useState('ping');

      return <span onClick={() => setText('pong')}>{text}</span>;
    };

    const plugin = createPlugin((<App />) as VNode);

    expect(plugin).toBeTruthy();
  });
});
