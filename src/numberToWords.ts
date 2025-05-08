import { getDecimalPlaces } from './_utils';
import { decimalFractionToWordsPL } from './decimalFractionToWords';
import { integerToWordsPL } from './integerToWords';

/**
 * Options for customizing the number-to-words conversion in Polish.
 */
export interface NumberToWordsOptions {
  /**
   * If true, use the informal form of fractional numbers (e.g., "pół" instead of "jedna druga").
   */
  informalFraction?: boolean;

  /**
   * Maximum number (inclusive) for which individual digits are used in informal fractions (e.g., "trzy czwarte").
   * Only relevant if `informalFraction` is true.
   */
  informalFractionFormIndividualNumberThreshold?: number;

  /**
   * If true, attempt to simplify fractions (e.g., 2/4 becomes 1/2).
   */
  simplifyFraction?: boolean;

  /**
   * If true, allow the use of single-word fractional forms where applicable (e.g., "półtorej", "ćwierć").
   */
  useSingleWordFractions?: boolean;
}

const SPECIAL_FRACTION_FORMS: Record<number, string> = {
  [1.5]: 'półtorej',
  [0.5]: 'pół',
  [0.25]: 'ćwierć',
};

/**
 * Converts a number into its Polish word form.
 * Handles integers, fractions, and combinations, with support for informal forms and custom options.
 *
 * @param num The number to convert (e.g., 123, 0.5, 2.25, -1).
 * @param options Optional settings to control formatting behavior.
 * @returns The number expressed in Polish words.
 */
export function numberToWordsPL(num: number, options?: NumberToWordsOptions): string {
  const optionsWithDefaults: Required<NumberToWordsOptions> = {
    informalFraction: false,
    informalFractionFormIndividualNumberThreshold: 4,
    simplifyFraction: false,
    useSingleWordFractions: false,
    ...(options ?? {}),
  };

  const isNegative = num < 0;
  num = Math.abs(num);

  const integerPart = Math.floor(num);
  const integerPartStr = integerToWordsPL(integerPart);
  if (Number.isInteger(num)) {
    return (isNegative ? 'minus ' : '') + integerPartStr;
  }

  if (
    optionsWithDefaults.informalFraction &&
    optionsWithDefaults.useSingleWordFractions &&
    SPECIAL_FRACTION_FORMS[num]
  ) {
    return (isNegative ? 'minus ' : '') + SPECIAL_FRACTION_FORMS[num];
  }

  const decimalPlaces = getDecimalPlaces(num);

  const fractionPart = roundToPrecision(num % 1, decimalPlaces);
  const fractionPartStr = decimalFractionToWordsPL(fractionPart, {
    informal: optionsWithDefaults.informalFraction,
    informalFormIndividualNumberThreshold: optionsWithDefaults.informalFractionFormIndividualNumberThreshold,
    simplifyFraction: optionsWithDefaults.simplifyFraction,
  });

  const fractionPartUsesPrzecinek = /przecinek/.test(fractionPartStr);
  const isIntegerZero = integerPart === 0;
  const keepIntegerPart = fractionPartUsesPrzecinek || !isIntegerZero;

  return (
    (isNegative ? 'minus ' : '') +
    (keepIntegerPart ? integerPartStr + ' ' : '') +
    (fractionPartUsesPrzecinek || isIntegerZero ? '' : 'i ') +
    fractionPartStr
  );
}

function roundToPrecision(value: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}
