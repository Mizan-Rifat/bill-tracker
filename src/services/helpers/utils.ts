export const getFsData = (doc) => ({ ...doc.data(), id: doc.id });

export const currencyFormat = (amount: number, options: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    ...options,
  }).format(amount);
};

export const numberFormat = (number: number, notation: 'standard' | 'compact' = 'standard') =>
  new Intl.NumberFormat('en-US', {
    notation,
  }).format(number);
