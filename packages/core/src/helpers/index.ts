import { style } from '@vanilla-extract/css';
import Element from './element';
import * as logger from './logger';
import * as error from './error';
import Node from './node';
import Transform, * as transforms from './transform';

export const helpers = {
  Element,
  logger,
  error,
  Node,
  Transform,
  ...transforms,
  style,
};
