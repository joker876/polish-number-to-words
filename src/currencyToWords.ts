import { integerToWordsPL } from './integerToWords';
import { pluralizePl } from './pluralize';

export function currencyToWordsPL(num: number): string;

export function currencyToWordsPL(
  num: number,
  currencyWords: [string, string, string],
  groszeWords: [string, string, string]
): string;

export function currencyToWordsPL(
  num: number,
  mainCurrencyWords: [string, string, string] = ['złoty', 'złote', 'złotych'],
  subCurrencyWords: [string, string, string] = ['grosz', 'grosze', 'groszy']
): string {
  const isNegative = num < 0;
  num = Math.abs(num);

  const mainCurrencyNum = Math.floor(num);
  const subCurrencyNum = Math.round((num % 1) * 100);

  const mainCurrencyStr = integerToWordsPL(mainCurrencyNum, { explicitSingleThousand: true });
  const subCurrencyStr = integerToWordsPL(subCurrencyNum);

  const mainCurrencyWord = pluralizePl(mainCurrencyNum, ...mainCurrencyWords);
  const subCurrencyWord = pluralizePl(subCurrencyNum, ...subCurrencyWords);

  return `${isNegative ? 'minus ' : ''}${mainCurrencyStr} ${mainCurrencyWord} ${subCurrencyStr} ${subCurrencyWord}`;
}
