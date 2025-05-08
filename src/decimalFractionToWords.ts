import { getDecimalPlaces } from './_utils';
import { commonFractionToWordsPL } from './commonFractionToWords';
import { integerToWordsPL } from './integerToWords';

/**
 * Options for converting decimal fractions to words in Polish.
 */
export interface DecimalFractionToWordsOptions {
  /**
   * If true, use the informal "digit-by-digit" style (e.g., "przecinek jeden dwa trzy").
   * Otherwise, express as a proper fraction (e.g., "trzy setne").
   */
  informal?: boolean;

  /**
   * Maximum number of decimal digits (inclusive) for which to use full number words
   * instead of digit-by-digit spelling in informal mode.
   */
  informalFormIndividualNumberThreshold?: number;

  /**
   * Whether to simplify the fraction before converting it (e.g., 25/100 → 1/4).
   */
  simplifyFraction?: boolean;
}

const WORDS_0_TO_9 = [
  'zero',
  'jeden',
  'dwa',
  'trzy',
  'cztery',
  'pięć',
  'sześć',
  'siedem',
  'osiem',
  'dziewięć',
] as const;

/**
 * Converts a decimal fraction into Polish words.
 * Can return either a full fractional phrase (e.g., "dwanaście tysięcznych") or a digit-by-digit form (e.g., "przecinek dwanaście"). Ignores the minus sign.
 *
 * @param num A non-integer number between 0 and 1 (e.g., 0.25, 0.125, etc.).
 * @param options Optional settings to customize the output style.
 * @throws Will throw if an integer is provided instead of a decimal fraction.
 * @returns A string representing the decimal fraction in Polish, ignoring the minus.
 */
export function decimalFractionToWordsPL(num: number, options?: DecimalFractionToWordsOptions): string {
  const optionsWithDefaults: Required<DecimalFractionToWordsOptions> = {
    informal: false,
    informalFormIndividualNumberThreshold: 4,
    simplifyFraction: false,
    ...(options ?? {}),
  };

  const isNegative = num < 0;
  num = Math.abs(num);

  if (num % 1 === 0) {
    throw new Error("Provided number isn't a fraction and cannot be spelled as a decimal fraction");
  }

  const decimalPlaces = getDecimalPlaces(num);

  if (!optionsWithDefaults.informal) {
    const fractionNumerator = fractionToInteger(num);
    const fractionDenominator = 10 ** decimalPlaces;

    if (!optionsWithDefaults.simplifyFraction) {
      return commonFractionToWordsPL(fractionNumerator, fractionDenominator);
    }

    const fraction = simplifyFraction(fractionNumerator, fractionDenominator);
    return commonFractionToWordsPL(fraction.numerator, fraction.denominator);
  }

  const numAsString = num.toString().split('.')[1];

  const parts: string[] = ['przecinek'];

  if (decimalPlaces < optionsWithDefaults.informalFormIndividualNumberThreshold) {
    parts.push(integerToWordsPL(Number(numAsString)));
  } else {
    parts.push(
      ...numAsString
        .split('')
        .slice(0, decimalPlaces)
        .map(v => WORDS_0_TO_9[Number(v)])
    );
  }
  return parts.filter(Boolean).join(' ');
}

function fractionToInteger(n: number): number {
  const decimalPlaces = getDecimalPlaces(n);
  return Math.round(n * 10 ** decimalPlaces);
}

function simplifyFraction(numerator: number, denominator: number): { numerator: number; denominator: number } {
  const gcd = greatestCommonDivisor(Math.abs(numerator), Math.abs(denominator));
  return {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
  };
}

function greatestCommonDivisor(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}
