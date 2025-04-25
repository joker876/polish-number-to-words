import { PluralizerPL } from './plural';

const WORDS_0_TO_19 = [
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
  'dziesięć',
  'jedenaście',
  'dwanaście',
  'trzynaście',
  'czternaście',
  'piętnaście',
  'szesnaście',
  'siedemnaście',
  'osiemnaście',
  'dziewiętnaście',
] as const;

const WORDS_TENS = {
  20: 'dwadzieścia',
  30: 'trzydzieści',
  40: 'czterdzieści',
  50: 'pięćdziesiąt',
  60: 'sześćdziesiąt',
  70: 'siedemdziesiąt',
  80: 'osiemdziesiąt',
  90: 'dziewięćdziesiąt',
} as const;

const WORDS_HUNDREDS = {
  100: 'sto',
  200: 'dwieście',
  300: 'trzysta',
  400: 'czterysta',
  500: 'pięćset',
  600: 'sześćset',
  700: 'siedemset',
  800: 'osiemset',
  900: 'dziewięćset',
} as const;

const WORDS_THOUSAND_AND_MORE: PluralizerPL[] = [
  new PluralizerPL('tysiąc', 'tysiące', 'tysięcy'),
  new PluralizerPL('milion', 'miliony', 'milionów'),
  new PluralizerPL('miliard', 'miliardy', 'miliardów'),
  new PluralizerPL('bilion', 'biliony', 'bilionów'),
  new PluralizerPL('biliard', 'biliardy', 'biliardów'),
  new PluralizerPL('trylion', 'tryliony', 'trylionów'),
  new PluralizerPL('tryliard', 'tryliardy', 'tryliardów'),
  new PluralizerPL('kwadrylion', 'kwadryliony', 'kwadrylionów'),
  new PluralizerPL('kwadryliard', 'kwadryliardy', 'kwadryliardów'),
  new PluralizerPL('kwintylion', 'kwintyliony', 'kwintylionów'),
  new PluralizerPL('kwintyliard', 'kwintyliardy', 'kwintyliardów'),
  new PluralizerPL('sekstylion', 'sekstyliony', 'sekstylionów'),
  new PluralizerPL('sekstyliard', 'sekstyliardy', 'sekstyliardów'),
  new PluralizerPL('septylion', 'septyliony', 'septylionów'),
  new PluralizerPL('septyliard', 'septyliardy', 'septyliardów'),
  new PluralizerPL('oktylion', 'oktyliony', 'oktylionów'),
  new PluralizerPL('oktyliard', 'oktyliardy', 'oktyliardów'),
  new PluralizerPL('nonilion', 'noniliony', 'nonilionów'),
  new PluralizerPL('noniliard', 'noniliardy', 'noniliardów'),
  new PluralizerPL('decylion', 'decyliony', 'decylionów'),
  new PluralizerPL('decyliard', 'decyliardy', 'decyliardów'),
];

export function numberToWordsPL(num: number): string {
  if (num === 0) {
    return WORDS_0_TO_19[0];
  }

  const parts: string[] = [];
  const isNegative = num < 0;
  let absNum = Math.abs(num);

  let groupIndex = 0;
  while (absNum > 0) {
    const groupNum = absNum % 1000;
    if (groupNum !== 0) {
      const groupWords = groupIndex === 0 ? convertHundreds(groupNum) : convertGroupWithScale(groupNum, groupIndex);
      parts.unshift(groupWords);
    }
    absNum = Math.floor(absNum / 1000);
    groupIndex++;
  }

  if (isNegative) parts.unshift('minus');
  return parts.join(' ');
}

function convertHundreds(n: number): string {
  const segs: string[] = [];

  if (n >= 100) {
    const h = (Math.floor(n / 100) * 100) as keyof typeof WORDS_HUNDREDS;
    segs.push(WORDS_HUNDREDS[h]);
    n %= 100;
  }

  if (n >= 20) {
    const t = (Math.floor(n / 10) * 10) as keyof typeof WORDS_TENS;
    segs.push(WORDS_TENS[t]);
    const u = n % 10;
    if (u > 0) segs.push(WORDS_0_TO_19[u]);
  } else if (n > 0) {
    segs.push(WORDS_0_TO_19[n]);
  }

  return segs.join(' ');
}

function convertGroupWithScale(n: number, scaleIdx: number): string {
  const pluralizer = WORDS_THOUSAND_AND_MORE[scaleIdx - 1];

  if (scaleIdx === 1 && n === 1) {
    return pluralizer.pluralize(n);
  }

  return `${convertHundreds(n)} ${pluralizer.pluralize(n)}`;
}
