import { style } from '@vanilla-extract/css';
import Element from './element';
import * as logger from './logger';
import Node from './node';
import Transform, * as transforms from './transform';

export const helpers = {
  Element,
  logger,
  Node,
  Transform,
  ...transforms,
  style,
};
