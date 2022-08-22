import {
  atom, AtomEffect, RecoilRoot, useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { Config } from '../config';
import { get, Key, KEY, set } from '../helpers/storage';

// For detail about Atom Effects,
// @see: https://recoiljs.org/docs/guides/atom-effects

// Make atom data in sync with local stored data for persistence.
const localStoragePersistence = <T>(key: Key, fallback: T): AtomEffect<T> => ({ trigger, setSelf, onSet }) => {
  if (trigger === 'get') {
    setSelf(get<T>(key) ?? fallback);
  }
  onSet((newValue) => {
    set<T>(key, newValue);
  });
};

export const GlobalStateProvider = RecoilRoot;
export const useGlobalState = useRecoilState;
export const useGlobalStateValue = useRecoilValue;
export const useGlobalStateSet = useSetRecoilState;

// Config
export const atomConfig = atom<Config>({
  key: 'config',
  default: {
    elements: [],
    texts: [],
  },
});
export const useConfigGlobalState = () => useGlobalState(atomConfig);
export const useConfigGlobalStateValue = () =>
  useGlobalStateValue(atomConfig);
export const useConfigGlobalStateSet = () =>
  useGlobalStateSet(atomConfig);

// Screen
type Screen = { width: number; height: number; };
export const atomScreen = atom<Screen>({
  key: 'screen',
  default: {
    width: 0,
    height: 0,
  },
});
export const useScreenGlobalState = () => useGlobalState(atomScreen);
export const useScreenGlobalStateValue = () =>
  useGlobalStateValue(atomScreen);
export const useScreenGlobalStateSet = () =>
  useGlobalStateSet(atomScreen);

// Color Scheme
export const COLOR_SCHEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
export type ColorScheme = typeof COLOR_SCHEME[keyof typeof COLOR_SCHEME];
export const atomColorScheme = atom<ColorScheme>({
  key: 'colorScheme',
  default: COLOR_SCHEME.LIGHT,
  effects_UNSTABLE: [
    localStoragePersistence<ColorScheme>(KEY.COLOR_SCHEME, COLOR_SCHEME.LIGHT),
  ],
});
export const useColorSchemelobalState = () => useGlobalState(atomColorScheme);
export const useColorSchemeGlobalStateValue = () =>
  useGlobalStateValue(atomColorScheme);
export const useColorSchemeGlobalStateSet = () =>
  useGlobalStateSet(atomColorScheme);
