import _ from 'lodash';

export const isBrower: boolean = typeof window !== 'undefined';

export const debounce = _.debounce;
