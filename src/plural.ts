export function pluralizePl(num: number, singular: string, plural234: string, plural5: string): string {
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
