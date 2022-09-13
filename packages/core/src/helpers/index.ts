import { style } from '@vanilla-extract/css';
import Editor from './editor';
import Element from './element';
import * as logger from './logger';
import Node from './node';
import Transforms, * as transforms from './transform';
import Text from './text';

export const helpers = {
  Editor,
  Element,
  logger,
  Node,
  Transforms,
  ...transforms,
  Text,
  style,
};
