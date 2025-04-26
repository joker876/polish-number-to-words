import { decimalFractionToWordsPL } from './decimalFractionToWords';
import { integerToWordsPL } from './integerToWords';

export interface NumberToWordsOptions {
  informalFraction?: boolean;
  informalFractionFormIndividualNumberThreshold?: number;
  simplifyFraction?: boolean;
  useSingleWordFractions?: boolean;
}

const SPECIAL_FRACTION_FORMS: Record<number, string> = {
  [1.5]: 'półtorej',
  [0.5]: 'pół',
  [0.25]: 'ćwierć',
};

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

  const fractionPart = num % 1;
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
