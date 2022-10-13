import { style } from '@vanilla-extract/css';
import Editor from './editor';
import Element, * as elements from './element';
import * as logger from './logger';
import * as error from './error';
import Node from './node';
import Path from './path';
import ReactEditor from './reactEditor';
import Transforms, * as transforms from './transform';
import Text, * as texts from './text';

export const helpers = {
  Editor,
  ReactEditor,
  Element,
  logger,
  error,
  Node,
  Path,
  Transforms,
  ...transforms,
  Text,
  style,
  ...elements,
  ...texts,
};
