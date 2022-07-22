export const useState = <T = any>(initialValue: T) => {
  const setState = (arg: T) => initialValue;
  return [initialValue, setState] as const;
};
