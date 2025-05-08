import { integerToWordsPL } from './integerToWords';
import { pluralizePl } from './pluralize';

/**
 * Converts a number representing a monetary value into Polish words.
 * By default, it uses "złoty/złote/złotych" and "grosz/grosze/groszy" as currency units.
 *
 * @param num The monetary value to convert (e.g., 12.50, -0.99).
 * @returns The full expression of the amount in Polish (e.g., "dwanaście złotych pięćdziesiąt groszy").
 */
export function currencyToWordsPL(num: number): string;

/**
 * Converts a number representing a monetary value into Polish words,
 * using custom word forms for the main and sub currency units.
 *
 * @param num The monetary value to convert (e.g., 12.50, -0.99).
 * @param currencyWords Word forms for the main currency in [singular, 2–4, 5+] form (e.g., ["euro", "euro", "euro"]).
 * @param groszeWords Word forms for the subcurrency in [singular, 2–4, 5+] form (e.g., ["cent", "centy", "centów"]).
 * @returns The full expression of the amount in Polish.
 */
export function currencyToWordsPL(
  num: number,
  currencyWords: [string, string, string],
  groszeWords: [string, string, string]
): string;

/**
 * Internal implementation for converting a currency number to Polish words.
 * Supports optional custom word forms for the main and subcurrency units.
 *
 * @param num The monetary value to convert.
 * @param mainCurrencyWords Optional main currency forms: [singular, 2–4, 5+].
 * @param subCurrencyWords Optional subcurrency forms: [singular, 2–4, 5+].
 * @returns Polish text representation of the currency amount.
 */
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
