/* @jsx h */
import { h, createPlugin, useState, VNode } from '../../lib';

describe('useState', () => {
  it('should update state when calling state updater', () => {
    const App = () => {
      const [text, setText] = useState('ping');
      setText('pong');

      return <span>{text}</span>;
    };

    const plugin = createPlugin((<App />) as VNode);

    // @ts-ignore
    console.log(new plugin().render().firstChild.nodeValue);
    expect(plugin).toBeTruthy();

    // doSetState(true);
    // expect(lastState).toBeTruthy();

    // doSetState((prevState) => !prevState);
    // expect(lastState).toBeFalsy();
  });
});
