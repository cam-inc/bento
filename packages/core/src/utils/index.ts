import justDebounceIt from 'just-debounce-it';
import validator from 'validator';

export const isBrower: boolean = typeof window !== 'undefined';

export const debounce = justDebounceIt;

export const isUrl = validator.isURL;
