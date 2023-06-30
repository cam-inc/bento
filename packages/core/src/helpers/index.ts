import { style } from '@vanilla-extract/css';
import * as childHelpers from './child';
import Element, * as elements from './element';
import * as error from './error';
import * as logger from './logger';
import Node, * as nodeHelpers from './node';
import Path, * as pathHelpers from './path';
import * as rangeHelpers from './range';
import ReactEditor from './reactEditor';
import Text, * as textHelpers from './text';
import * as transforms from './transform';

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
};
