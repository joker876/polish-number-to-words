/**
 * Pluralizes a number in Polish.
 * @param num A number (e.g., 1, 2, 5, -3)
 * @param singular Form for 1 (e.g., "kot")
 * @param plural234 Form for 2–4 (e.g., "koty")
 * @param plural5 Form for 5 and others (e.g., "kotów")
 * @returns Correct word form.
 */
export function pluralizePl(num: number, singular: string, plural234: string, plural5: string): string;

/**
 * Pluralizes a number in Polish with support for fractions.
 * @param num A number (e.g., 1, 2, 5, -3, 2.25)
 * @param singular Form for 1 (e.g., "kot")
 * @param plural234 Form for 2–4 (e.g., "koty")
 * @param plural5 Form for 5 and others (e.g., "kotów")
 * @param fractionForm Form for fractional values (e.g., "kota")
 * @returns Correct word form.
 */
export function pluralizePl(
  num: number,
  singular: string,
  plural234: string,
  plural5: string,
  fractionForm: string
): string;

export function pluralizePl(
  num: number,
  singular: string,
  plural234: string,
  plural5: string,
  fractionForm?: string
): string {
  if (!Number.isInteger(num)) {
    if (fractionForm == undefined) {
      throw new Error('Fractional number provided but no fraction form specified.');
    }
    return fractionForm;
  }

  const absNum = Math.abs(num);
  const lastDigit = absNum % 10;
  const lastTwoDigits = absNum % 100;

  if (absNum === 1) {
    return singular;
  } else if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
    return plural234;
  } else {
    return plural5;
  }
}

export class PluralizerPL {
  constructor(public readonly singular: string, public readonly plural234: string, public readonly plural5: string) {}

  public pluralize(num: number): string {
    return pluralizePl(num, this.singular, this.plural234, this.plural5);
  }
  public toString(): string {
    return `1: ${this.singular}, 2: ${this.plural234}, 5: ${this.plural5}`;
  }
}
