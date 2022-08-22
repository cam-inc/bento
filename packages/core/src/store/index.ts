import {
  atom, RecoilRoot, useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { Config } from '../config';

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
