# polish-number-to-words

Convert numbers to grammatically correct **Polish words**, including support for:
- Integers (e.g., `123 → "sto dwadzieścia trzy"`)
- Decimal fractions (e.g., `2.5 → "dwa i jedna druga"` or `"dwa przecinek pięć"`)
- Currency amounts (e.g., `19.99 → "dziewiętnaście złotych dziewięćdziesiąt dziewięć groszy"`)
- Common fractions (e.g., `1/4 → "jedna czwarta"`)
- Polish pluralization logic (e.g., `"1 kot"`, `"2 koty"`, `"5 kotów"`)

## Features

- Handles complex pluralization rules in Polish
- Outputs grammatically correct, readable words
- Built-in currency formatting
- Supports both formal and informal styles
- TypeScript-ready with strong typing

---

## Installation

```bash
npm install polish-number-to-words
```

---

## Quick Usage

```ts
import {
  numberToWordsPL,
  integerToWordsPL,
  decimalFractionToWordsPL,
  commonFractionToWordsPL,
  currencyToWordsPL,
  pluralizePl,
} from 'polish-number-to-words';

numberToWordsPL(123);
// => "sto dwadzieścia trzy"

currencyToWordsPL(19.99);
// => "dziewiętnaście złotych dziewięćdziesiąt dziewięć groszy"

decimalFractionToWordsPL(0.25);
// => "dwadzieścia pięć setnych"
decimalFractionToWordsPL(0.25, { simplifyFraction: true });
// => "jedna czwarta"
decimalFractionToWordsPL(0.25, { informal: true });
// => "przecinek dwadzieścia pięć"

commonFractionToWordsPL(5, 6);
// => "pięć szóstych"

pluralizePl(1, 'kot', 'koty', 'kotów');
// => "kot"
pluralizePl(3, 'kot', 'koty', 'kotów');
// => "koty"
pluralizePl(5, 'kot', 'koty', 'kotów');
// => "kotów"
```

---

## API Reference

### `numberToWordsPL(num, options?)`

Converts a number (integer or decimal) to its Polish word representation.

**Parameters:**
- `num`: `number` — Value to convert.
- `options`:  
  - `informalFraction`: `boolean` – Use informal fraction forms using "przecinek".
  - `useSingleWordFractions`: `boolean` – Allows forms like `"pół"` for `0.5`.
  - `simplifyFraction`: `boolean` – Reduces fractions like `25/100 → 1/2`.

**Returns:** `string`

---

### `integerToWordsPL(num, options?)`

Converts an integer number to its word form.

**Options:**
- `explicitSingleThousand`: If `true`, renders `1000` as `"jeden tysiąc"` instead of `"tysiąc"`.

---

### `decimalFractionToWordsPL(num, options?)`

Renders a decimal number like `0.25` as `"jedna czwarta"` or `"przecinek dwa pięć"`.

---

### `commonFractionToWordsPL(numerator, denominator)`

Renders a common fraction using grammatically correct ordinal forms.

```ts
commonFractionToWordsPL(3, 4); // => "trzy czwarte"

commonFractionToWordsPL(123, 10000); // => "sto dwadzieścia trzy dziesięciotysięczne"
```

---

### `currencyToWordsPL(num, currencyWords?, subcurrencyWords?)`

Converts currency amounts into Polish, defaults to złoty/grosz.

```ts
currencyToWordsPL(1.01);
// => "jeden złoty jeden grosz"
```

You may override the currency names:

```ts
currencyToWordsPL(1.01, ['euro', 'euro', 'euro'], ['cent', 'centy', 'centów']);
// => "jeden euro jeden cent"
```

---

### `pluralizePl(num, singular, plural234, plural5)`

Returns the correct form of a Polish noun based on a number.

```ts
pluralizePl(1, 'jabłko', 'jabłka', 'jabłek'); // => "jabłko"
pluralizePl(3, 'jabłko', 'jabłka', 'jabłek'); // => "jabłka"
pluralizePl(7, 'jabłko', 'jabłka', 'jabłek'); // => "jabłek"
```

Supports generic types as well:

```ts
enum PluralOptions {
  One,
  Two,
  Five
}

pluralizePl(3, PluralOptions.One, PluralOptions.Two, PluralOptions.Five);
```

---

## TypeScript Support

All functions are fully typed and ready to use in TypeScript projects.

---

## License

MIT

---

## Author

Created with 💚 for the Polish language. ~joker876

[GitHub Repository](https://github.com/joker876/polish-number-to-words)
