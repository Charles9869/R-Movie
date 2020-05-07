export const formatAuthKey = (key) => {
  return key.slice(key.indexOf('|') + 1, key.length);
};

export const validateYear = (year) => {
  let text = /^[0-9]+$/;
  if (year !== '' && !text.test(year)) return false;
  if (year.length !== 4) return false;
  let current_year = new Date().getFullYear();
  if (year < 1920 || year > current_year) return false;
  return true;
};

export const nFormatter = (num, digits) => {
  let si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  let rx = '/.0+$|(.[0-9]*[1-9])0+$/';
  let i;

  for (i = si.length - 1; i > 0; i--) if (num >= si[i].value) break;

  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};
