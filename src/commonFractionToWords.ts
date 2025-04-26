import { integerToWordsPL } from './integerToWords';
import { PluralizerPL } from './pluralize';

const WORDS_0_TO_19 = [
  new PluralizerPL('zerowa', 'zerowe', 'zerowych'),
  new PluralizerPL('pierwsza', 'pierwsze', 'pierwszych'),
  new PluralizerPL('druga', 'drugie', 'drugich'),
  new PluralizerPL('trzecia', 'trzecie', 'trzecich'),
  new PluralizerPL('czwarta', 'czwarte', 'czwartych'),
  new PluralizerPL('piąta', 'piąte', 'piątych'),
  new PluralizerPL('szósta', 'szóste', 'szóstych'),
  new PluralizerPL('siódma', 'siódme', 'siódmych'),
  new PluralizerPL('ósma', 'ósme', 'ósmych'),
  new PluralizerPL('dziewiąta', 'dziewiąte', 'dziewiątych'),
  new PluralizerPL('dziesiąta', 'dziesiąte', 'dziesiątych'),
  new PluralizerPL('jedenasta', 'jedenaste', 'jedenastych'),
  new PluralizerPL('dwunasta', 'dwunaste', 'dwunastych'),
  new PluralizerPL('trzynasta', 'trzynaste', 'trzynastych'),
  new PluralizerPL('czternasta', 'czternaste', 'czternastych'),
  new PluralizerPL('piętnasta', 'piętnaste', 'piętnastych'),
  new PluralizerPL('szesnasta', 'szesnaste', 'szesnastych'),
  new PluralizerPL('siedemnasta', 'siedemnaste', 'siedemnastych'),
  new PluralizerPL('osiemnasta', 'osiemnaste', 'osiemnastych'),
  new PluralizerPL('dziewiętnasta', 'dziewiętnaste', 'dziewiętnastych'),
] as const;

const WORDS_TENS: Record<number, PluralizerPL> = {
  20: new PluralizerPL('dwudziesta', 'dwudzieste', 'dwudziestych'),
  30: new PluralizerPL('trzydziesta', 'trzydzieste', 'trzydziestych'),
  40: new PluralizerPL('czterdziesta', 'czterdzieste', 'czterdziestych'),
  50: new PluralizerPL('pięćdziesiąta', 'pięćdziesiąte', 'pięćdziesiątych'),
  60: new PluralizerPL('sześćdziesiąta', 'sześćdziesiąte', 'sześćdziesiątych'),
  70: new PluralizerPL('siedemdziesiąta', 'siedemdziesiąte', 'siedemdziesiątych'),
  80: new PluralizerPL('osiemdziesiąta', 'osiemdziesiąte', 'osiemdziesiątych'),
  90: new PluralizerPL('dziewięćdziesiąta', 'dziewięćdziesiąte', 'dziewięćdziesiątych'),
};

const WORDS_HUNDREDS: Record<number, PluralizerPL> = {
  100: new PluralizerPL('setna', 'setne', 'setnych'),
  200: new PluralizerPL('dwusetna', 'dwusetne', 'dwusetnych'),
  300: new PluralizerPL('trzysetna', 'trzysetne', 'trzysetnych'),
  400: new PluralizerPL('czterysetna', 'czterysetne', 'czterysetnych'),
  500: new PluralizerPL('pięćsetna', 'pięćsetne', 'pięćsetnych'),
  600: new PluralizerPL('sześćsetna', 'sześćsetne', 'sześćsetnych'),
  700: new PluralizerPL('siedemsetna', 'siedemsetne', 'siedemsetnych'),
  800: new PluralizerPL('osiemsetna', 'osiemsetne', 'osiemsetnych'),
  900: new PluralizerPL('dziewięćsetna', 'dziewięćsetne', 'dziewięćsetnych'),
};

const WORDS_THOUSAND_AND_MORE = [
  new PluralizerPL('tysięczna', 'tysięczne', 'tysięcznych'),
  new PluralizerPL('milionowa', 'milionowe', 'milionowych'),
  new PluralizerPL('miliardowa', 'miliardowe', 'miliardowych'),
  new PluralizerPL('bilionowa', 'bilionowe', 'bilionowych'),
  new PluralizerPL('biliardowa', 'biliardowe', 'biliardowych'),
  new PluralizerPL('trylionowa', 'trylionowe', 'trylionowych'),
  new PluralizerPL('tryliardowa', 'tryliardowe', 'tryliardowych'),
  new PluralizerPL('kwadrylionowa', 'kwadrylionowe', 'kwadrylionowych'),
  new PluralizerPL('kwadryliardowa', 'kwadryliardowe', 'kwadryliardowych'),
  new PluralizerPL('kwintylionowa', 'kwintylionowe', 'kwintylionowych'),
  new PluralizerPL('kwintyliardowa', 'kwintyliardowe', 'kwintyliardowych'),
  new PluralizerPL('sekstylionowa', 'sekstylionowe', 'sekstylionowych'),
  new PluralizerPL('sekstyliardowa', 'sekstyliardowe', 'sekstyliardowych'),
  new PluralizerPL('septylionowa', 'septylionowe', 'septylionowych'),
  new PluralizerPL('septyliardowa', 'septyliardowe', 'septyliardowych'),
  new PluralizerPL('oktylionowa', 'oktylionowe', 'oktylionowych'),
  new PluralizerPL('oktyliardowa', 'oktyliardowe', 'oktyliardowych'),
  new PluralizerPL('nonilionowa', 'nonilionowe', 'nonilionowych'),
  new PluralizerPL('noniliardowa', 'noniliardowe', 'noniliardowych'),
  new PluralizerPL('decylionowa', 'decylionowe', 'decylionowych'),
  new PluralizerPL('decyliardowa', 'decyliardowe', 'decyliardowych'),
];

const COMPOUND_AMOUNTS_0_TO_19 = [
  '',
  'jedno',
  'dwu',
  'trzy',
  'cztero',
  'pięcio',
  'sześcio',
  'siedmio',
  'ośmio',
  'dziewięcio',
  'dziesięcio',
  'jedenasto',
  'dwunasto',
  'trzynasto',
  'czternasto',
  'piętnasto',
  'szesnasto',
  'siedemnasto',
  'osiemnasto',
  'dziewiętnasto',
] as const;

const COMPOUND_AMOUNTS_TENS: Record<number, string> = {
  20: 'dwudziesto',
  30: 'trzydziesto',
  40: 'czterdziesto',
  50: 'pięćdziesięcio',
  60: 'sześćdziesięcio',
  70: 'siedemdziesięcio',
  80: 'osiemdziesięcio',
  90: 'dziewięćdziesięcio',
};

const COMPOUND_AMOUNTS_HUNDREDS: Record<number, string> = {
  100: 'stu',
  200: 'dwustu',
  300: 'trzystu',
  400: 'czterystu',
  500: 'pięciuset',
  600: 'sześciuset',
  700: 'siedmiuset',
  800: 'ośmiuset',
  900: 'dziewięciuset',
};

export function commonFractionToWordsPL(numerator: number, denominator: number): string {
  const numeratorStr = convertNumerator(numerator);
  const denominatorStr = convertDenominator(denominator, numerator);

  return numeratorStr + ' ' + denominatorStr;
}

function convertNumerator(num: number): string {
  if (Math.abs(num) === 1) {
    return num < 0 ? 'minus jedna' : 'jedna';
  }
  return integerToWordsPL(num).replace(/dwa$/, 'dwie');
}

function convertDenominator(num: number, numeratorForPluralization: number): string {
  if (num >= 0 && num <= 19) {
    return WORDS_0_TO_19[num].pluralize(numeratorForPluralization);
  }

  const parts: string[] = [];
  const isNegative = num < 0;
  let absNum = Math.abs(num);

  let groupIndex = 0;
  let wasGroupWithContentFound = false;
  while (absNum > 0) {
    const groupNum = absNum % 1000;
    if (groupNum !== 0) {
      const groupWords =
        groupIndex === 0
          ? convertHundreds(groupNum, numeratorForPluralization)
          : convertGroupWithScale(groupNum, groupIndex, numeratorForPluralization, !wasGroupWithContentFound);
      parts.push(groupWords);
      wasGroupWithContentFound = true;
    }
    absNum = Math.floor(absNum / 1000);
    groupIndex++;
  }

  if (isNegative) parts.push('minus');
  return parts.reverse().join(' ');
}

function convertHundreds(n: number, numeratorForPluralization: number): string {
  const segs: string[] = [];

  if (n >= 100) {
    const h = (Math.floor(n / 100) * 100) as keyof typeof WORDS_HUNDREDS;

    if (n % 100 != 0) {
      segs.push(integerToWordsPL(h));
    } else {
      segs.push(WORDS_HUNDREDS[h].pluralize(numeratorForPluralization));
    }
    n %= 100;
  }

  if (n >= 20) {
    const t = (Math.floor(n / 10) * 10) as keyof typeof WORDS_TENS;
    segs.push(WORDS_TENS[t].pluralize(numeratorForPluralization));
    const u = n % 10;
    if (u > 0) segs.push(WORDS_0_TO_19[u].pluralize(numeratorForPluralization));
  } else if (n > 0) {
    segs.push(WORDS_0_TO_19[n].pluralize(numeratorForPluralization));
  }

  return segs.join(' ');
}

function convertGroupWithScale(
  groupAsHundreds: number,
  scaleIdx: number,
  numeratorForPluralization: number,
  isLowestGroup: boolean
): string {
  if (!isLowestGroup) {
    return integerToWordsPL(groupAsHundreds * 1000 ** scaleIdx);
  }

  const pluralizer = WORDS_THOUSAND_AND_MORE[scaleIdx - 1];

  return `${convertHundredsForGroup(groupAsHundreds)}${pluralizer.pluralize(numeratorForPluralization)}`.trim();
}

function convertHundredsForGroup(n: number): string {
  const segs: string[] = [];

  if (n >= 100) {
    const h = (Math.floor(n / 100) * 100) as keyof typeof COMPOUND_AMOUNTS_HUNDREDS;

    if (n % 100 != 0) {
      segs.push(integerToWordsPL(h) + ' ');
    } else {
      segs.push(COMPOUND_AMOUNTS_HUNDREDS[h]);
    }
    n %= 100;
  }

  if (n >= 20) {
    const t = (Math.floor(n / 10) * 10) as keyof typeof COMPOUND_AMOUNTS_TENS;
    segs.push(COMPOUND_AMOUNTS_TENS[t]);
    const u = n % 10;
    if (u > 0) segs.push(COMPOUND_AMOUNTS_0_TO_19[u]);
  } else if (n >= 2) {
    segs.push(COMPOUND_AMOUNTS_0_TO_19[n]);
  }

  return segs.join('');
}
