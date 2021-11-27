export const isNumber = (value?: string): boolean => {
  return !!(value && /^\d+$/.test(value));
};

export const toNumber = (value?: string, defaultValue = 0): number => {
  return isNumber(value) ? Number(value) : defaultValue;
};
