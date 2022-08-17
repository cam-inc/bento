import justDebounceIt from 'just-debounce-it';

export const isBrower: boolean = typeof window !== 'undefined';

export const debounce = justDebounceIt;
