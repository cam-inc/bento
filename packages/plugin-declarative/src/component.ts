import { VNode } from './types';
import { Fragment } from './create-element';

export class Component {
  public props: VNode['props'];

  constructor(props: VNode['props']) {
    this.props = props;
  }

  render(props: VNode['props']) {
    return Fragment(props);
  }
}
