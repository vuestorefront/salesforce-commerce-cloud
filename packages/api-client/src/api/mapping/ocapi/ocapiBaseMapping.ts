import camelCase from 'camelcase-keys';

const getCustomAttributeKeys = (obj: Record<string, any>): string[] => Object.keys(obj).reduce((acc, key) => {
  if(typeof obj[key] === 'object' && obj[key] !== null) {
    return [ ...acc, ...getCustomAttributeKeys(obj[key]) ];
  }

  if (key.startsWith('c_')) {
    return [ ...acc, key ];
  }

  return acc;
}, [])

export const baseMapping = <T extends Record<string, any>>(obj: Record<string, any>): T => camelCase(obj, {
  deep: true,
  exclude: getCustomAttributeKeys(obj)
}) as T;
