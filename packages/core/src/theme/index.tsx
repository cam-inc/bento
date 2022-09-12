import { assignInlineVars } from '@vanilla-extract/dynamic';
import extend from 'just-extend';
import React, { useMemo } from 'react';
import { PartialDeep } from 'type-fest';
import { useColorSchemeGlobalStateValue } from '../store';
import { defaultThemeToken, themeVars, ThemeToken } from './index.css';

export type ThemeProps = {
  token: PartialDeep<ThemeToken>;
  render: (
    style: ReturnType<typeof assignInlineVars>
  ) => /*React.ReactNode*/JSX.Element;
};
export const Theme: React.FC<ThemeProps> = ({ token, render }) => {
  const colorScheme = useColorSchemeGlobalStateValue();

  const style = useMemo(() => {
    const _token = {};
    extend(true, _token, defaultThemeToken);
    if (colorScheme === 'light') {
      extend(true, _token, {
        color: (() => {
          const keys = Object.keys(themeVars.color.light) as (keyof typeof themeVars.color.light)[];
          return keys.reduce<Partial<typeof themeVars.color>>((prev, curr) => {
            prev[curr] = themeVars.color.light[curr];
            return prev;
          }, {});
        })(),
      });
    }
    if (colorScheme === 'dark') {
      extend(true, _token, {
        color: (() => {
          const keys = Object.keys(themeVars.color.dark) as (keyof typeof themeVars.color.dark)[];
          return keys.reduce<Partial<typeof themeVars.color>>((prev, curr) => {
            prev[curr] = themeVars.color.dark[curr];
            return prev;
          }, {});
        })(),
      });
    }
    extend(true, _token, token);
    return assignInlineVars(themeVars, _token as ThemeToken);
  }, [token, colorScheme]);

  return render(style);
};
