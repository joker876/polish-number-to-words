import { commonFractionToWordsPL } from './commonFractionToWords';
import { integerToWordsPL } from './integerToWords';

export interface DecimalFractionToWordsOptions {
  informal?: boolean;
  informalFormIndividualNumberThreshold?: number;
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
      // nie skracamy ułamka
      return commonFractionToWordsPL(fractionNumerator, fractionDenominator);
    }

    // skrócony ułamek
    const fraction = simplifyFraction(fractionNumerator, fractionDenominator);
    return commonFractionToWordsPL(fraction.numerator, fraction.denominator);
  }

  const numAsString = num.toString().split('.')[1];

  const parts: string[] = ['przecinek'];

  if (decimalPlaces < optionsWithDefaults.informalFormIndividualNumberThreshold) {
    parts.push(integerToWordsPL(Number(numAsString)));
  } else {
    parts.push(...numAsString.split('').map(v => WORDS_0_TO_9[Number(v)]));
  }
  return parts.filter(Boolean).join(' ');
}

function fractionToInteger(n: number): number {
  const decimalPlaces = getDecimalPlaces(n);
  return Math.round(n * 10 ** decimalPlaces);
}

function getDecimalPlaces(n: number): number {
  const str = n.toString();
  return str.split('.')[1].length;
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
