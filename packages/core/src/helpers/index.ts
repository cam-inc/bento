import { style } from '@vanilla-extract/css';
import Element, * as elements from './element';
import * as logger from './logger';
import * as error from './error';
import Node, * as nodeHelpers from './node';
import Path, * as pathHelpers from './path';
import * as rangeHelpers from './range';
import ReactEditor from './reactEditor';
import * as transforms from './transform';
import Text, * as textHelpers from './text';
import * as childHelpers from './child';

export const helpers = {
  ReactEditor,
  Element,
  logger,
  error,
  Node,
  Path,
  ...transforms,
  Text,
  style,
  ...elements,
  nodeHelpers,
  textHelpers,
  pathHelpers,
  rangeHelpers,
  childHelpers,
  nodeHelpers,
};
