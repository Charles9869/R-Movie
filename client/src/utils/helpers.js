export const formatAuthKey = (key) => {
  return key.slice(key.indexOf('|') + 1, key.length);
};
