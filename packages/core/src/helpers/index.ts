import { style } from '@vanilla-extract/css';
import Editor from './editor';
import Element, * as elements from './element';
import * as logger from './logger';
import * as error from './error';
import Node from './node';
import Transforms, * as transforms from './transform';
import Text, * as texts from './text';

export const helpers = {
  Editor,
  Element,
  logger,
  error,
  Node,
  Transforms,
  ...transforms,
  Text,
  style,
  ...elements,
  ...texts,
};
