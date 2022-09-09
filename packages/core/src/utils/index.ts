import justDebounceIt from 'just-debounce-it';
import { Element, Text } from 'slate';

export const isBrower: boolean = typeof window !== 'undefined';

export const debounce = justDebounceIt;

export const isElement = Element.isElement;

export const isText = Text.isText;
