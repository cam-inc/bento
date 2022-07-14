/* @jsx h */
import { h, createPlugin, VNode } from '../../lib';

describe('createPlugin', () => {
  it('should create a plugin class', () => {
    const Plugin = () => (
      <tool save={() => {}}>
        <div></div>
      </tool>
    );

    const plugin = createPlugin((<Plugin />) as unknown as VNode);
    expect(plugin).toBeTruthy();
  });
});
